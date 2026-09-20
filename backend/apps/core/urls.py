from django.urls import path
from .views import SiteSettingView, TechnologyListView, FAQListView, TeamMemberListView

urlpatterns = [
    path('site-settings/', SiteSettingView.as_view(), name='site-settings'),
    path('technologies/', TechnologyListView.as_view(), name='technologies-list'),
    path('faqs/', FAQListView.as_view(), name='faqs-list'),
    path('team/', TeamMemberListView.as_view(), name='team-list'),
]
