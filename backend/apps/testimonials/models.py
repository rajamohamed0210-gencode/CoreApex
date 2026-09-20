from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Testimonial(models.Model):
    client_name = models.CharField(max_length=120)
    client_role = models.CharField(max_length=120, default='Chief Executive Officer')
    company_name = models.CharField(max_length=120)
    avatar_url = models.CharField(
        max_length=255,
        default='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
    )
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    project_title = models.CharField(max_length=150, blank=True)
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.client_name} - {self.company_name}"
