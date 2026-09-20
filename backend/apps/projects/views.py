from rest_framework import generics
from .models import Project
from .serializers import ProjectSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.filter(is_published=True)
    serializer_class = ProjectSerializer
    pagination_class = None

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.filter(is_published=True)
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

class FeaturedProjectListView(generics.ListAPIView):
    queryset = Project.objects.filter(is_published=True, is_featured=True)
    serializer_class = ProjectSerializer
    pagination_class = None
