"""
URL configuration for Core Apex backend project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve

# Custom Admin Site Branding
admin.site.site_header = "Core Apex.dev Control Center"
admin.site.site_title = "Core Apex Admin"
admin.site.index_title = "Digital Solutions & Lead Pipeline Management"

urlpatterns = [
    path('admin/', admin.site.urls),
    # Versioned API routes (v1)
    path('api/v1/', include('apps.core.urls')),
    path('api/v1/', include('apps.services.urls')),
    path('api/v1/', include('apps.projects.urls')),
    path('api/v1/', include('apps.contacts.urls')),
    path('api/v1/', include('apps.testimonials.urls')),

    # Legacy / Direct API routes for backwards-compatibility
    path('api/', include('apps.core.urls')),
    path('api/', include('apps.services.urls')),
    path('api/', include('apps.projects.urls')),
    path('api/', include('apps.contacts.urls')),
    path('api/', include('apps.testimonials.urls')),
]

# Uploaded media (team avatars, etc.).
# NOTE: django.conf.urls.static.static() only routes files while DEBUG is True,
# so production would 404 on /media/... . We serve MEDIA_ROOT explicitly when
# SERVE_MEDIA is enabled — keep this for small files, or offload to a CDN /
# object storage (Cloudinary, S3) if you host a lot of media.
if settings.SERVE_MEDIA:
    urlpatterns += [
        re_path(
            r"^media/(?P<path>.*)$",
            serve,
            {"document_root": settings.MEDIA_ROOT},
        ),
    ]
