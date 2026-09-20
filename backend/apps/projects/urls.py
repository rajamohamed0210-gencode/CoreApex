from django.urls import path
from .views import ProjectListView, ProjectDetailView, FeaturedProjectListView

urlpatterns = [
    path('projects/', ProjectListView.as_view(), name='projects-list'),
    path('projects/featured/', FeaturedProjectListView.as_view(), name='projects-featured'),
    path('projects/<slug:slug>/', ProjectDetailView.as_view(), name='project-detail'),
]
