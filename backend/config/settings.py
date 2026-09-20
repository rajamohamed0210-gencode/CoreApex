"""
Django settings for Core Apex.dev backend project.
"""

import os
from pathlib import Path

from dotenv import load_dotenv
import dj_database_url


# =========================================================
# BASE
# =========================================================

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# =========================================================
# ENVIRONMENT HELPERS
# =========================================================

def env_bool(name, default=False):
    value = os.getenv(name)

    if value is None:
        return default

    return value.lower() in ("1", "true", "yes", "on")


def env_list(name, default=""):
    value = os.getenv(name, default)

    return [
        item.strip()
        for item in value.split(",")
        if item.strip()
    ]


# =========================================================
# SECURITY
# =========================================================

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY is not configured. "
        "Set SECRET_KEY in your .env file or production environment."
    )

DEBUG = env_bool("DEBUG", True)


# =========================================================
# HOSTS
# =========================================================

ALLOWED_HOSTS = env_list(
    "ALLOWED_HOSTS",
    "localhost,127.0.0.1"
)


# =========================================================
# APPLICATIONS
# =========================================================

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party
    "rest_framework",
    "corsheaders",

    # Local
    "apps.core.apps.CoreConfig",
    "apps.services.apps.ServicesConfig",
    "apps.projects.apps.ProjectsConfig",
    "apps.contacts.apps.ContactsConfig",
    "apps.testimonials.apps.TestimonialsConfig",
]


# =========================================================
# MIDDLEWARE
# =========================================================

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",

    # WhiteNoise
    "whitenoise.middleware.WhiteNoiseMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# =========================================================
# URL / WSGI
# =========================================================

ROOT_URLCONF = "config.urls"

WSGI_APPLICATION = "config.wsgi.application"


# =========================================================
# TEMPLATES
# =========================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "templates",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# =========================================================
# DATABASE
# =========================================================

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }

else:
    # Local development fallback
    use_sqlite = env_bool("USE_SQLITE_LOCAL", True)

    if use_sqlite:
        DATABASES = {
            "default": {
                "ENGINE": "django.db.backends.sqlite3",
                "NAME": BASE_DIR / "db.sqlite3",
            }
        }

    else:
        DATABASES = {
            "default": {
                "ENGINE": os.getenv(
                    "DB_ENGINE",
                    "django.db.backends.postgresql",
                ),
                "NAME": os.getenv("DB_NAME", "coreapex_db"),
                "USER": os.getenv("DB_USER", "postgres"),
                "PASSWORD": os.getenv("DB_PASSWORD", "0202"),
                "HOST": os.getenv("DB_HOST", "localhost"),
                "PORT": os.getenv("DB_PORT", "5432"),
            }
        }


# =========================================================
# PASSWORD VALIDATION
# =========================================================

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME":
            "django.contrib.auth.password_validation."
            "UserAttributeSimilarityValidator"
    },
    {
        "NAME":
            "django.contrib.auth.password_validation."
            "MinimumLengthValidator"
    },
    {
        "NAME":
            "django.contrib.auth.password_validation."
            "CommonPasswordValidator"
    },
    {
        "NAME":
            "django.contrib.auth.password_validation."
            "NumericPasswordValidator"
    },
]


# =========================================================
# INTERNATIONALIZATION
# =========================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kolkata"

USE_I18N = True
USE_TZ = True


# =========================================================
# STATIC FILES
# =========================================================

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND":
            "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


# =========================================================
# MEDIA FILES
# =========================================================

MEDIA_URL = "/media/"

MEDIA_ROOT = Path(
    os.getenv(
        "MEDIA_ROOT",
        str(BASE_DIR / "media"),
    )
)


# =========================================================
# DEFAULT PRIMARY KEY
# =========================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# =========================================================
# DJANGO REST FRAMEWORK
# =========================================================

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS":
        "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 50,
}


# =========================================================
# CORS
# =========================================================

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = env_list(
    "CORS_ALLOWED_ORIGINS",
    (
        "http://localhost:5173,"
        "http://127.0.0.1:5173,"
        "http://localhost:3000"
    ),
)


# =========================================================
# CSRF
# =========================================================

CSRF_TRUSTED_ORIGINS = env_list(
    "CSRF_TRUSTED_ORIGINS",
    (
        "http://localhost:5173,"
        "http://127.0.0.1:5173"
    ),
)


# =========================================================
# EMAIL
# =========================================================

EMAIL_BACKEND = os.getenv(
    "EMAIL_BACKEND",
    "django.core.mail.backends.smtp.EmailBackend",
)

EMAIL_HOST = os.getenv("EMAIL_HOST", "")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", "587"))

EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")

EMAIL_USE_TLS = env_bool("EMAIL_USE_TLS", True)

DEFAULT_FROM_EMAIL = os.getenv(
    "DEFAULT_FROM_EMAIL",
    "Core Apex.dev <coreapex.dev@gmail.com>",
)

PROJECT_REQUEST_RECIPIENT = os.getenv(
    "PROJECT_REQUEST_RECIPIENT",
    "coreapex.dev@gmail.com",
)


# =========================================================
# PRODUCTION SECURITY
# =========================================================

if not DEBUG:

    SECURE_PROXY_SSL_HEADER = (
        "HTTP_X_FORWARDED_PROTO",
        "https",
    )

    SECURE_SSL_REDIRECT = True

    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

    SESSION_COOKIE_HTTPONLY = True

    SECURE_CONTENT_TYPE_NOSNIFF = True

    SECURE_BROWSER_XSS_FILTER = True

    X_FRAME_OPTIONS = "DENY"

    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True