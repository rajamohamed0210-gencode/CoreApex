from django.db import models
from django.utils.text import slugify

class Service(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    tagline = models.CharField(max_length=255, blank=True)
    short_description = models.TextField(help_text='Concise summary for homepage and cards')
    full_description = models.TextField(help_text='Detailed overview for service detail page')
    icon_name = models.CharField(max_length=50, default='Code', help_text='Lucide icon name e.g. Globe, Smartphone, Server, Cloud, Cpu, Palette')
    features = models.JSONField(default=list, blank=True, help_text='List of key feature bullets')
    deliverables = models.JSONField(default=list, blank=True, help_text='List of key deliverables')
    tech_stack = models.JSONField(default=list, blank=True, help_text='Associated technologies list')
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Service'
        verbose_name_plural = 'Services'
        ordering = ['order', 'id']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Solution(models.Model):
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    industry = models.CharField(max_length=100, default='Cross-Industry')
    tagline = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    key_modules = models.JSONField(default=list, blank=True, help_text='Key modules or capabilities')
    business_benefits = models.JSONField(default=list, blank=True, help_text='ROI & business values')
    icon_name = models.CharField(max_length=50, default='Layers')
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Solution'
        verbose_name_plural = 'Solutions'
        ordering = ['order', 'id']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
