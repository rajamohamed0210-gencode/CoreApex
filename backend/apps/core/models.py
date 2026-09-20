from django.db import models

class SiteSetting(models.Model):
    site_name = models.CharField(max_length=100, default='Core Apex.dev')
    tagline = models.CharField(max_length=255, default='Web • App • Cloud • Software Solutions')
    hero_headline = models.CharField(max_length=255, default='We Turn Ideas Into Digital Reality.')
    hero_subheading = models.TextField(
        default='We build modern websites, mobile applications, cloud platforms and custom software solutions that help businesses grow.'
    )
    email = models.EmailField(default='coreapex.dev@gmail.com')
    phone = models.CharField(max_length=50, default='+91 7639930013')
    address = models.CharField(max_length=255, default='1/137, L. Karungulam, Ramanathapuram, Tamil Nadu – 623527')
    whatsapp_url = models.URLField(blank=True, null=True, default='https://wa.me/message/THZ4AI7TCFGLE1')
    founder_name = models.CharField(max_length=100, default='Raja Mohamed')
    founder_role = models.CharField(max_length=100, default='Founder & CEO')
    founder_bio = models.TextField(
        default='Passionate about building scalable digital products and transforming business visions into high-impact reality.'
    )
    github_url = models.URLField(blank=True, null=True, default='https://github.com')
    linkedin_url = models.URLField(blank=True, null=True, default='https://linkedin.com')
    twitter_url = models.URLField(blank=True, null=True, default='https://x.com')
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Setting'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return f"{self.site_name} Configuration"


class Technology(models.Model):
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('cloud', 'Cloud & DevOps'),
        ('api', 'API & Integration'),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='backend')
    icon_name = models.CharField(max_length=50, help_text='Icon identifier e.g. python, django, react')
    description = models.CharField(max_length=255, blank=True)
    is_core = models.BooleanField(default=True, help_text='Display in central orbit')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = 'Technology'
        verbose_name_plural = 'Technologies'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class FAQ(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('development', 'Development Process'),
        ('pricing', 'Pricing & Engagement'),
        ('support', 'Support & Maintenance'),
    ]

    question = models.CharField(max_length=255)
    answer = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='general')
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'
        ordering = ['order', 'id']

    def __str__(self):
        return self.question


class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    bio = models.TextField()
    avatar = models.ImageField(
        upload_to='team/',
        blank=True,
        null=True,
        verbose_name='Avatar',
        help_text='Upload an image file for this team member (preferred over Avatar URL).'
    )
    avatar_url = models.URLField(
        blank=True,
        verbose_name='Avatar URL',
        help_text='Optional fallback external image URL (used only if no uploaded Avatar exists).'
    )
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'
        ordering = ['order']

    def __str__(self):
        return f"{self.name} - {self.role}"
