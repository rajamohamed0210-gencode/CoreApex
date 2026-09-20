from django.urls import path
from .views import ContactLeadCreateView, ContactLeadListView, ContactLeadUpdateStatusView

urlpatterns = [
    path('contact/', ContactLeadCreateView.as_view(), name='contact-create'),
    path('leads/', ContactLeadListView.as_view(), name='leads-list'),
    path('leads/<int:pk>/', ContactLeadUpdateStatusView.as_view(), name='lead-update'),
]
