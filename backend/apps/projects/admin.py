from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'industry', 'category', 'is_featured', 'is_published', 'order', 'created_at')
    list_filter = ('category', 'industry', 'is_featured', 'is_published')
    search_fields = ('title', 'client', 'industry', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_featured', 'is_published', 'order')
