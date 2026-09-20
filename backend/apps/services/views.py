from rest_framework import generics
from .models import Service, Solution
from .serializers import ServiceSerializer, SolutionSerializer

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    pagination_class = None

class ServiceDetailView(generics.RetrieveAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'slug'

class SolutionListView(generics.ListAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    pagination_class = None

class SolutionDetailView(generics.RetrieveAPIView):
    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    lookup_field = 'slug'
