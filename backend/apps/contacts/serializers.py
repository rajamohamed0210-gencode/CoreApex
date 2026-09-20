from rest_framework import serializers
from .models import ContactLead

class ContactLeadSerializer(serializers.ModelSerializer):
    service_display = serializers.CharField(source='get_service_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ContactLead
        fields = '__all__'
        read_only_fields = ('status', 'admin_notes', 'created_at', 'updated_at')

class ContactLeadAdminSerializer(serializers.ModelSerializer):
    service_display = serializers.CharField(source='get_service_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ContactLead
        fields = '__all__'
