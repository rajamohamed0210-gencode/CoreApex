from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.contacts.models import ContactLead
from apps.core.models import TeamMember
from apps.projects.models import Project
from apps.services.models import Service
from apps.testimonials.models import Testimonial
from .models import AdminProfile

UserModel = get_user_model()


class AdminUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'full_name', 'role', 'is_active', 'is_staff']

    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username

    def get_role(self, obj):
        profile = getattr(obj, 'admin_profile', None)
        if profile is None:
            return 'ADMIN' if obj.is_superuser or obj.is_staff else 'MANAGER'
        return profile.role


class AdminProfileSerializer(serializers.ModelSerializer):
    user = AdminUserSerializer(read_only=True)

    class Meta:
        model = AdminProfile
        fields = ['id', 'user', 'role', 'is_active', 'created_at', 'updated_at']


class TeamMemberAdminSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    avatar_file = serializers.ImageField(source='avatar', write_only=True, required=False, allow_null=True)

    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'role', 'bio', 'avatar', 'avatar_file', 'avatar_url', 'linkedin_url', 'github_url', 'order', 'is_active']

    def get_avatar(self, obj):
        if obj.avatar and hasattr(obj.avatar, 'url'):
            request = self.context.get('request')
            return request.build_absolute_uri(obj.avatar.url) if request else obj.avatar.url
        return obj.avatar_url or None


class ServiceAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'tagline', 'short_description', 'full_description',
            'icon_name', 'features', 'deliverables', 'tech_stack', 'order', 'is_featured'
        ]


class ProjectAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'slug', 'client', 'industry', 'category', 'tagline',
            'short_description', 'challenge', 'solution', 'results_summary',
            'technologies', 'metrics', 'featured_image', 'gallery_images',
            'website_url', 'github_url', 'is_featured', 'is_published', 'order',
            'created_at', 'updated_at'
        ]


class ContactLeadAdminSerializer(serializers.ModelSerializer):
    service_display = serializers.CharField(source='get_service_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    budget_display = serializers.CharField(source='get_budget_display', read_only=True)

    class Meta:
        model = ContactLead
        fields = [
            'id', 'name', 'email', 'phone', 'company', 'service', 'service_display',
            'budget', 'budget_display', 'project_details', 'status', 'status_display',
            'admin_notes', 'created_at', 'updated_at'
        ]


class TestimonialAdminSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_role', 'company_name', 'avatar', 'avatar_url',
            'content', 'rating', 'project_title', 'is_featured', 'order', 'created_at'
        ]

    def get_avatar(self, obj):
        return obj.avatar_url or None


class HealthSerializer(serializers.Serializer):
    api_status = serializers.BooleanField(default=True)
    database_status = serializers.BooleanField(default=True)
    media_storage_status = serializers.BooleanField(default=True)
    timestamp = serializers.DateTimeField()
