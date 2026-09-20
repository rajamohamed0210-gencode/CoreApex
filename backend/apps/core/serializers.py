from rest_framework import serializers
from .models import SiteSetting, Technology, FAQ, TeamMember

class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

class TeamMemberSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    resolved_avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = '__all__'

    def get_avatar(self, obj):
        """Return the absolute URL of the uploaded avatar image, or None."""
        if obj.avatar:
            request = self.context.get('request')
            url = obj.avatar.url
            return request.build_absolute_uri(url) if request else url
        return None

    def get_resolved_avatar_url(self, obj):
        """Priority: uploaded avatar -> avatar_url -> None (frontend fallback handles default)."""
        avatar = self.get_avatar(obj)
        return avatar if avatar else (obj.avatar_url or None)
