from django.urls import path
from .views import ServiceListView, ServiceDetailView, SolutionListView, SolutionDetailView

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='services-list'),
    path('services/<slug:slug>/', ServiceDetailView.as_view(), name='service-detail'),
    path('solutions/', SolutionListView.as_view(), name='solutions-list'),
    path('solutions/<slug:slug>/', SolutionDetailView.as_view(), name='solution-detail'),
]
