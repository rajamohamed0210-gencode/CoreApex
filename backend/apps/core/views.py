from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteSetting, Technology, FAQ, TeamMember
from .serializers import SiteSettingSerializer, TechnologySerializer, FAQSerializer, TeamMemberSerializer

class SiteSettingView(APIView):
    def get(self, request):
        setting = SiteSetting.objects.first()
        if not setting:
            setting = SiteSetting.objects.create()
        serializer = SiteSettingSerializer(setting)
        return Response(serializer.data)

class TechnologyListView(generics.ListAPIView):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    pagination_class = None

class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_published=True)
    serializer_class = FAQSerializer
    pagination_class = None

class TeamMemberListView(generics.ListAPIView):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    pagination_class = None
