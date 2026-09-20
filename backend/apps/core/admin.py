from django.contrib import admin
from django.utils.html import format_html
from .models import SiteSetting, Technology, FAQ, TeamMember

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'email', 'phone', 'founder_name', 'updated_at')

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'icon_name', 'is_core', 'order')
    list_filter = ('category', 'is_core')
    search_fields = ('name', 'description')
    list_editable = ('order', 'is_core')

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order', 'is_published')
    list_filter = ('category', 'is_published')
    search_fields = ('question', 'answer')
    list_editable = ('order', 'is_published')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('avatar_thumb', 'name', 'role', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'role')
    list_editable = ('order', 'is_active')
    readonly_fields = ('avatar_preview',)
    fieldsets = (
        (None, {
            'fields': ('name', 'role', 'bio')
        }),
        ('Profile Image', {
            'fields': ('avatar', 'avatar_preview', 'avatar_url'),
            'description': 'Upload an Avatar via "Choose File", or provide an optional external Avatar URL as a fallback.'
        }),
        ('Social Links', {
            'fields': ('linkedin_url', 'github_url')
        }),
        ('Display Options', {
            'fields': ('order', 'is_active')
        }),
    )

    def avatar_preview(self, obj):
        """Show a thumbnail preview of the current avatar inside Django Admin."""
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width:96px;height:96px;object-fit:cover;border-radius:8px;border:1px solid #ccc;" alt="Avatar preview of {}" />',
                obj.avatar.url, obj.name
            )
        if obj.avatar_url:
            return format_html(
                '<img src="{}" style="width:96px;height:96px;object-fit:cover;border-radius:8px;border:1px solid #ccc;" alt="Avatar preview of {}" />',
                obj.avatar_url, obj.name
            )
        return 'No avatar set'
    avatar_preview.short_description = 'Current Avatar Preview'

    def avatar_thumb(self, obj):
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width:40px;height:40px;object-fit:cover;border-radius:50%;" alt="{}" />',
                obj.avatar.url, obj.name
            )
        if obj.avatar_url:
            return format_html(
                '<img src="{}" style="width:40px;height:40px;object-fit:cover;border-radius:50%;" alt="{}" />',
                obj.avatar_url, obj.name
            )
        return '—'
    avatar_thumb.short_description = 'Avatar'
