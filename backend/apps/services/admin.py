from django.contrib import admin
from .models import Service, Solution

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'order', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('order', 'is_featured')
    search_fields = ('title', 'short_description')

@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ('title', 'industry', 'slug', 'order', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('order', 'is_featured')
    search_fields = ('title', 'industry', 'description')
