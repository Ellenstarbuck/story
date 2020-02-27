#pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Story
from .serializers import StorySerializer

# Create your views here.

class StoryListView(APIView):
  def get(self, _request):
    storys =  Story.objects.all()
    serialized_storys = StorySerializer(storys, many=True)
    return Response(serialized_storys.data)



class StoryDetailView(APIView):
  def get(self, _request, pk):
    story = Story.objects.get(pk=pk)
    serialized_storys = StorySerializer(story)
    return Response(serialized_storys.data)
