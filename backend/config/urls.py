"""
URL configuration for Core Apex.dev backend project.
"""

from django.contrib import admin
from django.conf import settings
from django.urls import include, path, re_path
from django.views.static import serve


# =========================================================
# DJANGO ADMIN BRANDING
# =========================================================

admin.site.site_header = "Core Apex.dev Control Center"
admin.site.site_title = "Core Apex Admin"
admin.site.index_title = "Digital Solutions & Lead Pipeline Management"


# =========================================================
# URL PATTERNS
# =========================================================

urlpatterns = [

    # -----------------------------------------------------
    # Existing Django Admin
    # -----------------------------------------------------
    path("admin/", admin.site.urls),

    # -----------------------------------------------------
    # Standalone Custom Admin Dashboard API
    # -----------------------------------------------------
    path(
        "api/v1/admin-dashboard/",
        include("admin_dashboard.urls"),
    ),

    # -----------------------------------------------------
    # Versioned Public API - v1
    # -----------------------------------------------------
    path(
        "api/v1/",
        include("apps.core.urls"),
    ),

    path(
        "api/v1/",
        include("apps.services.urls"),
    ),

    path(
        "api/v1/",
        include("apps.projects.urls"),
    ),

    path(
        "api/v1/",
        include("apps.contacts.urls"),
    ),

    path(
        "api/v1/",
        include("apps.testimonials.urls"),
    ),

    # -----------------------------------------------------
    # Legacy / Direct API Routes
    # Kept for existing frontend compatibility
    # -----------------------------------------------------
    path(
        "api/",
        include("apps.core.urls"),
    ),

    path(
        "api/",
        include("apps.services.urls"),
    ),

    path(
        "api/",
        include("apps.projects.urls"),
    ),

    path(
        "api/",
        include("apps.contacts.urls"),
    ),

    path(
        "api/",
        include("apps.testimonials.urls"),
    ),
]


# =========================================================
# MEDIA FILES
# =========================================================
#
# Team avatars and other uploaded media are served from
# MEDIA_ROOT when SERVE_MEDIA=True.
#
# Production:
# MEDIA_ROOT=/var/data/media
# MEDIA_URL=/media/
#
# This works with the Render Persistent Disk.
# =========================================================

if settings.SERVE_MEDIA:
    urlpatterns += [
        re_path(
            r"^media/(?P<path>.*)$",
            serve,
            {
                "document_root": settings.MEDIA_ROOT,
            },
        ),
    ]