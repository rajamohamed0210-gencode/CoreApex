from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'company_name', 'rating', 'project_title', 'is_featured', 'order')
    list_filter = ('rating', 'is_featured')
    search_fields = ('client_name', 'company_name', 'content')
    list_editable = ('is_featured', 'order')
