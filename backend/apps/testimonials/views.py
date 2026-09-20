from rest_framework import generics
from .models import Testimonial
from .serializers import TestimonialSerializer

class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_featured=True)
    serializer_class = TestimonialSerializer
    pagination_class = None

    def finalize_response(self, request, response, *args, **kwargs):
        response = super().finalize_response(request, response, *args, **kwargs)
        response['Cache-Control'] = 'no-store, max-age=0'
        return response
