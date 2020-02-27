#pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Story, Line, Genre
from .serializers import StorySerializer, LineSerializer, PopulatedStorySerializer, UserSerializer, GenreSerializer

# Create your views here.

class StoryListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request):
    storys =  Story.objects.all()
    serialized_storys = PopulatedStorySerializer(storys, many=True)
    return Response(serialized_storys.data)

  def post(self, request):
    request.data['owner'] = request.user.id
    story = StorySerializer(data=request.data)
    if story.is_valid():
      story.save()
      return Response(story.data, status=HTTP_201_CREATED)
    return Response(story.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)  

class StoryDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request, pk):
    try: 
      story = Story.objects.get(pk=pk)
      serialized_storys = PopulatedStorySerializer(story)
      return Response(serialized_storys.data)
    except Story.DoesNotExist:
      return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)  


  def put(self, request, pk):

    try: 
      request.data['owner'] = request.user.id 
      story = Story.objects.get(pk=pk)
      if story.owner.id != request.user.id:  # quick check to see if the user making the request is the same user who created the post, if not don't allow updates
            return Response(status=HTTP_401_UNAUTHORIZED)
      updated_story = StorySerializer(story, data=request.data)  
      if updated_story.is_valid():
        updated_story.save()
        return Response(updated_story.data, status=HTTP_202_ACCEPTED)
      return Response(updated_story.errors, status=HTTP_422_UNPROCESSABLE_ENTITY) 
    except Story.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

  def delete(self, request, pk):
      try:
        story = Story.objects.get(pk=pk) 
        if story.owner.id != request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)
        story.delete()
        return Response(status=HTTP_204_NO_CONTENT)    
      except Story.DoesNotExist:
        return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)

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
      return Response(status=HTTP_204_NO_CONTENT) 
    except Line.DoesNotExist:
      return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)   

class GenreListView(APIView): 
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request): 
        genre = Genre.objects.all() 
        serialized_genres = GenreSerializer(genre, many=True) 
        return Response(serialized_genres.data)     