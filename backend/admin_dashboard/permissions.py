from rest_framework.permissions import BasePermission


class IsAdminAuthenticated(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        profile = getattr(request.user, 'admin_profile', None)
        if profile is not None and not profile.is_active:
            return False

        if getattr(request.user, 'is_superuser', False) or getattr(request.user, 'is_staff', False):
            return True

        if profile is None:
            return False
        return True


class HasAdminRole(BasePermission):
    allowed_roles = ('ADMIN', 'EDITOR', 'MANAGER')

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if getattr(request.user, 'is_superuser', False) or getattr(request.user, 'is_staff', False):
            return True

        profile = getattr(request.user, 'admin_profile', None)
        if profile is None or not profile.is_active:
            return False

        return profile.role in self.allowed_roles


class IsAdminOnly(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        profile = getattr(request.user, 'admin_profile', None)
        if profile is not None and not profile.is_active:
            return False

        if getattr(request.user, 'is_superuser', False):
            return True

        if profile is None:
            return False
        return profile.role == 'ADMIN'


class CanManageContent(IsAdminOnly):
    pass


class CanManageProjects(IsAdminOnly):
    pass
