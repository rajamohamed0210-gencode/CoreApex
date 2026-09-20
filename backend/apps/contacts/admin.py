from django.contrib import admin
from django.utils.html import format_html
from .models import ContactLead

@admin.register(ContactLead)
class ContactLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'company', 'service', 'budget', 'status_badge', 'created_at')
    list_filter = ('status', 'service', 'budget', 'created_at')
    search_fields = ('name', 'email', 'company', 'project_details', 'phone')
    readonly_fields = ('created_at', 'updated_at')
    list_per_page = 25

    fieldsets = (
        ('Lead Information', {
            'fields': ('name', 'email', 'phone', 'company')
        }),
        ('Project Requirements', {
            'fields': ('service', 'budget', 'project_details')
        }),
        ('Pipeline Status & CRM Notes', {
            'fields': ('status', 'admin_notes', 'created_at', 'updated_at')
        }),
    )

    def status_badge(self, obj):
        colors = {
            'new': '#126BFF',          # Electric Blue
            'contacted': '#00B4D8',    # Cyan
            'discussion': '#F59E0B',   # Amber
            'proposal_sent': '#8B5CF6',# Purple
            'won': '#10B981',          # Emerald Green
            'lost': '#EF4444',         # Red
        }
        color = colors.get(obj.status, '#64748B')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 4px 8px; border-radius: 9999px; font-weight: 600; font-size: 11px; text-transform: uppercase;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Pipeline Status'
