#pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_401_UNAUTHORIZED, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Story, Line
from .serializers import StorySerializer, LineSerializer, PopulatedStorySerializer

# Create your views here.

class StoryListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request):
    storys =  Story.objects.all()
    serialized_storys = StorySerializer(storys, many=True)
    return Response(serialized_storys.data)



class StoryDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request, pk):
    story = Story.objects.get(pk=pk)
    serialized_storys = StorySerializer(story)
    return Response(serialized_storys.data)


class LineListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request, pk):
    request.data['story'] = pk
    request.data['owner'] = request.user.id
    line = LineSerializer(data=request.data)

    if line.is_valid():
      line.save()
      story = Story.objects.get(pk=pk)
      serialized_story = PopulatedStorySerializer(story)

      return Response(serialized_story.data, status=HTTP_201_CREATED)
    return Response(line.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)  

class LineDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def delete(self, request, **kwargs):

    try:
      line = Line.objects.get(pk=kwargs['line_pk'])
      if line.owner.id != request.user.id:
        return Response(status=HTTP_401_UNAUTHORIZED)
      line.delete()
      return Response(status=HTTP_401_UNAUTHORIZED) 
    except Line.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)   