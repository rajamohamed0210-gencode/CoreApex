"""
URL configuration for Core Apex backend project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

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

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
