from rest_framework import generics, status
from rest_framework.response import Response
from .models import ContactLead
from .serializers import ContactLeadSerializer, ContactLeadAdminSerializer

class ContactLeadCreateView(generics.CreateAPIView):
    queryset = ContactLead.objects.all()
    serializer_class = ContactLeadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({
            'success': True,
            'message': 'Thank you! Your project request has been submitted to Core Apex. Our engineering lead will contact you within 24 hours.',
            'lead': serializer.data
        }, status=status.HTTP_201_CREATED)

class ContactLeadListView(generics.ListAPIView):
    """Admin / Dashboard overview of all captured leads"""
    queryset = ContactLead.objects.all()
    serializer_class = ContactLeadAdminSerializer
    pagination_class = None

class ContactLeadUpdateStatusView(generics.UpdateAPIView):
    queryset = ContactLead.objects.all()
    serializer_class = ContactLeadAdminSerializer
