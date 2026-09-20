from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web Application'),
        ('mobile', 'Mobile Application'),
        ('cloud', 'Cloud & DevOps'),
        ('software', 'Custom Software / ERP'),
        ('api', 'API & Integration'),
    ]

    title = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    client = models.CharField(max_length=100, blank=True)
    industry = models.CharField(max_length=100, default='Technology & Retail')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='web')
    tagline = models.CharField(max_length=255, blank=True)
    short_description = models.TextField()
    challenge = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    results_summary = models.TextField(blank=True)
    technologies = models.JSONField(default=list, help_text='List of tech used e.g. ["React", "Django", "PostgreSQL"]')
    metrics = models.JSONField(default=list, blank=True, help_text='List of metric dicts e.g. [{"label": "Performance", "value": "+120%"}]')
    featured_image = models.CharField(max_length=255, default='https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop')
    gallery_images = models.JSONField(default=list, blank=True)
    website_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=True)
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.industry})"
