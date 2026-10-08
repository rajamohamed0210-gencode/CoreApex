from django.conf import settings
from django.db import models


class AdminProfile(models.Model):
    ROLE_ADMIN = 'ADMIN'
    ROLE_EDITOR = 'EDITOR'
    ROLE_MANAGER = 'MANAGER'
    ROLE_CHOICES = [
        (ROLE_ADMIN, 'Admin'),
        (ROLE_EDITOR, 'Editor'),
        (ROLE_MANAGER, 'Manager'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='admin_profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=ROLE_ADMIN)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Admin profile'
        verbose_name_plural = 'Admin profiles'

    def __str__(self):
        return f'{self.user.get_full_name() or self.user.username} ({self.role})'
