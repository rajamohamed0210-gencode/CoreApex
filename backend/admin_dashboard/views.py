from django.contrib.auth import get_user_model
from django.db import connection
from django.utils import timezone

from rest_framework import generics, status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.contacts.models import ContactLead
from apps.core.models import SiteSetting, TeamMember
from apps.core.serializers import SiteSettingSerializer
from apps.projects.models import Project
from apps.services.models import Service
from apps.testimonials.models import Testimonial

from .models import AdminProfile
from .permissions import IsAdminAuthenticated, IsAdminOnly
from .serializers import (
    AdminProfileSerializer,
    AdminUserSerializer,
    ContactLeadAdminSerializer,
    HealthSerializer,
    ProjectAdminSerializer,
    ServiceAdminSerializer,
    TeamMemberAdminSerializer,
    TestimonialAdminSerializer,
)


UserModel = get_user_model()


# =========================================================
# AUTHENTICATION
# =========================================================

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "username"

    @classmethod
    def get_token(cls, user):
        return super().get_token(user)

    def validate(self, attrs):
        username_or_email = attrs.get("username") or attrs.get("email")
        password = attrs.get("password")

        if not username_or_email or not password:
            raise AuthenticationFailed(
                "Username/email and password are required."
            )

        if "@" in username_or_email:
            user = UserModel.objects.filter(
                email__iexact=username_or_email
            ).first()
        else:
            user = UserModel.objects.filter(
                username__iexact=username_or_email
            ).first()

        if (
            user is None
            or not user.is_active
            or not user.check_password(password)
        ):
            raise AuthenticationFailed(
                "Invalid username/email or password."
            )

        profile = getattr(user, "admin_profile", None)

        if profile is None and not (
            user.is_staff or user.is_superuser
        ):
            raise AuthenticationFailed(
                "This account does not have admin access."
            )

        if profile is not None and not profile.is_active:
            raise AuthenticationFailed(
                "This admin account is inactive."
            )

        if profile is None:
            AdminProfile.objects.get_or_create(
                user=user,
                defaults={"role": AdminProfile.ROLE_ADMIN},
            )

        data = super().validate(
            {
                "username": user.username,
                "password": password,
            }
        )

        data["user"] = AdminUserSerializer(user).data

        return data


class AdminAuthLoginView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer


class AdminAuthRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = RefreshToken(refresh_token)

            user = UserModel.objects.filter(
                pk=token.get("user_id"),
                is_active=True,
            ).first()

            profile = (
                getattr(user, "admin_profile", None)
                if user
                else None
            )

            is_admin = bool(
                user
                and (
                    user.is_staff
                    or user.is_superuser
                    or profile is not None
                )
            )

            if not is_admin:
                return Response(
                    {
                        "detail": (
                            "This account does not have active "
                            "admin access."
                        )
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            if profile is not None and not profile.is_active:
                return Response(
                    {
                        "detail": (
                            "This admin account is inactive."
                        )
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            return Response(
                {
                    "access": str(token.access_token),
                },
                status=status.HTTP_200_OK,
            )

        except TokenError:
            return Response(
                {"detail": "Invalid refresh token."},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class AdminAuthLogoutView(APIView):
    permission_classes = [IsAdminAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")

        if refresh:
            try:
                token = RefreshToken(refresh)
                token.blacklist()
            except TokenError:
                return Response(
                    {"detail": "Invalid refresh token."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"detail": "Logged out successfully."},
            status=status.HTTP_200_OK,
        )


class AdminMeView(APIView):
    permission_classes = [IsAdminAuthenticated]

    def get(self, request):
        profile = getattr(
            request.user,
            "admin_profile",
            None,
        )

        data = AdminUserSerializer(request.user).data

        if profile:
            data["role"] = profile.role

        return Response(data)


# =========================================================
# HEALTH
# =========================================================

class AdminHealthView(APIView):
    permission_classes = [IsAdminAuthenticated]

    def get(self, request):
        database_ok = True

        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
        except Exception:
            database_ok = False

        media_ok = True

        payload = HealthSerializer(
            {
                "api_status": True,
                "database_status": database_ok,
                "media_storage_status": media_ok,
                "timestamp": timezone.now(),
            }
        ).data

        return Response(payload)


# =========================================================
# DASHBOARD
# =========================================================

class AdminDashboardView(APIView):
    permission_classes = [IsAdminAuthenticated]

    def get(self, request):
        data = {
            "team_total": TeamMember.objects.count(),
            "services_total": Service.objects.count(),
            "projects_total": Project.objects.count(),
            "project_requests": ContactLead.objects.count(),
            "new_contacts": ContactLead.objects.filter(
                status="new"
            ).count(),
            "active_testimonials": Testimonial.objects.filter(
                is_featured=True
            ).count(),

            "recent_projects": ProjectAdminSerializer(
                Project.objects.order_by("-created_at")[:5],
                many=True,
            ).data,

            "recent_contacts": ContactLeadAdminSerializer(
                ContactLead.objects.order_by("-created_at")[:5],
                many=True,
            ).data,

            "recent_testimonials": TestimonialAdminSerializer(
                Testimonial.objects.order_by("-created_at")[:5],
                many=True,
            ).data,

            "recent_team": TeamMemberAdminSerializer(
                TeamMember.objects.order_by("-id")[:5],
                many=True,
                context={"request": request},
            ).data,
        }

        return Response(data)


# =========================================================
# TEAM
# =========================================================

class AdminTeamListCreateView(generics.ListCreateAPIView):
    queryset = TeamMember.objects.all().order_by(
        "order",
        "name",
    )
    serializer_class = TeamMemberAdminSerializer
    permission_classes = [IsAdminAuthenticated]

    # Return a direct array for the standalone React dashboard.
    pagination_class = None

    def get_serializer_context(self):
        return {
            "request": self.request,
            "format": self.format_kwarg,
            "view": self,
        }

    def perform_create(self, serializer):
        serializer.save()


class AdminTeamDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberAdminSerializer
    permission_classes = [IsAdminAuthenticated]

    def get_serializer_context(self):
        return {
            "request": self.request,
            "format": self.format_kwarg,
            "view": self,
        }


# =========================================================
# SERVICES
# =========================================================

class AdminServiceListCreateView(
    generics.ListCreateAPIView
):
    queryset = Service.objects.all().order_by(
        "order",
        "title",
    )
    serializer_class = ServiceAdminSerializer
    permission_classes = [IsAdminAuthenticated]

    pagination_class = None


class AdminServiceDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Service.objects.all()
    serializer_class = ServiceAdminSerializer
    permission_classes = [IsAdminAuthenticated]


# =========================================================
# PROJECTS
# =========================================================

class AdminProjectListCreateView(
    generics.ListCreateAPIView
):
    queryset = Project.objects.all().order_by(
        "-created_at"
    )
    serializer_class = ProjectAdminSerializer
    permission_classes = [IsAdminAuthenticated]

    pagination_class = None


class AdminProjectDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Project.objects.all()
    serializer_class = ProjectAdminSerializer
    permission_classes = [IsAdminAuthenticated]


# =========================================================
# CONTACTS
# =========================================================

class AdminContactListCreateView(
    generics.ListCreateAPIView
):
    queryset = ContactLead.objects.all().order_by(
        "-created_at"
    )
    serializer_class = ContactLeadAdminSerializer
    permission_classes = [IsAdminAuthenticated]

    pagination_class = None


class AdminContactDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = ContactLead.objects.all()
    serializer_class = ContactLeadAdminSerializer
    permission_classes = [IsAdminAuthenticated]


# =========================================================
# TESTIMONIALS
# =========================================================

class AdminTestimonialListCreateView(
    generics.ListCreateAPIView
):
    queryset = Testimonial.objects.all().order_by(
        "order",
        "-created_at",
    )
    serializer_class = TestimonialAdminSerializer
    permission_classes = [IsAdminAuthenticated]

    pagination_class = None


class AdminTestimonialDetailView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialAdminSerializer
    permission_classes = [IsAdminAuthenticated]


# =========================================================
# ADMIN USERS
# =========================================================

class AdminUserListView(generics.ListAPIView):
    queryset = UserModel.objects.all().order_by(
        "username"
    )
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminOnly]

    pagination_class = None


# =========================================================
# SITE SETTINGS
# =========================================================

class AdminSettingsView(APIView):
    permission_classes = [IsAdminOnly]

    def get(self, request):
        setting = SiteSetting.objects.first()

        if setting is None:
            return Response(
                {
                    "detail": (
                        "Site settings have not been configured."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        return Response(
            SiteSettingSerializer(
                setting,
                context={"request": request},
            ).data
        )

    def put(self, request):
        return self.update_setting(
            request,
            partial=False,
        )

    def patch(self, request):
        return self.update_setting(
            request,
            partial=True,
        )

    def update_setting(self, request, partial):
        setting = SiteSetting.objects.first()

        if setting is None:
            return Response(
                {
                    "detail": (
                        "Site settings have not been configured."
                    )
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = SiteSettingSerializer(
            setting,
            data=request.data,
            partial=partial,
            context={"request": request},
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(serializer.data)