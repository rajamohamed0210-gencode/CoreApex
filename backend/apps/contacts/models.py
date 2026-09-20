from django.db import models

class ContactLead(models.Model):
    SERVICE_CHOICES = [
        ('website', 'Website Development'),
        ('mobile_app', 'Mobile App Development'),
        ('ecommerce', 'Ecommerce Platform'),
        ('custom_software', 'Custom Software Development'),
        ('crm_erp', 'CRM / ERP Solution'),
        ('cloud_solution', 'Cloud Solution & Infrastructure'),
        ('api_dev', 'API Development & Integration'),
        ('ui_ux', 'UI/UX Design'),
        ('other', 'Other Custom Requirement'),
    ]

    BUDGET_CHOICES = [
        ('under_25k', 'Under ₹25,000'),
        ('25k_50k', '₹25,000 – ₹50,000'),
        ('50k_1lakh', '₹50,000 – ₹1,00,000'),
        ('1lakh_plus', '₹1,00,000+'),
        ('not_sure', 'Not sure yet'),
    ]

    STATUS_CHOICES = [
        ('new', 'New Lead'),
        ('contacted', 'Contacted'),
        ('discussion', 'In Discussion'),
        ('proposal_sent', 'Proposal Sent'),
        ('won', 'Won (Closed-Won)'),
        ('lost', 'Lost (Closed-Lost)'),
    ]

    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=120, blank=True)
    service = models.CharField(max_length=50, choices=SERVICE_CHOICES, default='website')
    budget = models.CharField(max_length=50, choices=BUDGET_CHOICES, default='25k_50k')
    project_details = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True, help_text='Internal notes for sales / development team')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Contact Lead'
        verbose_name_plural = 'Contact Leads (Pipeline)'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.get_service_display()}) - {self.get_status_display()}"
