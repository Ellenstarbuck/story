#pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Story, Line

from .serializers import StorySerializer, LineSerializer, PopulatedStorySerializer, UserSerializer


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
  #this router checks if the person adding the line to the story is different then the person who added a line before them
  #if they are different then they are allowed to make the request

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request, pk):
        # request data user is the same as that owner
        request.data['owner'] = request.user.id
        # get the story the line is being added to    
        request.data['story'] = pk
        #serializing the data we have requested so we can make our checks on it (previous line and story)
        line = LineSerializer(data=request.data)
        story = Story.objects.get(pk=pk)
        serialized_story = PopulatedStorySerializer(story)
        request.data['owner'] = request.user.id
        #getting the index of the last line
        index_last_story = len(serialized_story.data.get("lines")) - 1
        #getting the index of the lines
        lines_list_length = len(serialized_story.data.get("lines"))
        #checking to see if the story has lines in it, and then getting the owner of the last line.
        if lines_list_length:
            last_story = serialized_story.data.get("lines")[index_last_story]
            last_owner = last_story.get("owner")
        if lines_list_length > 0:
          #if there are lines on the story, and if the owner is the same as the current user, then stop them adding a line
          if last_owner.get("id") == request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)
          #if its valid, saving the story 
        if line.is_valid():
          line.save()
          story = Story.objects.get(pk=pk)
          serialized_story = PopulatedStorySerializer(story)
          return Response(serialized_story.data)
        return Response(line.errors, status=HTTP_422_UNPROCESSABLE_ENTITY) 


  # def put(self, request, pk):
  #       request.data['story'] = pk
  #       line = LineSerializer(data=request.data)
  #       story = Story.objects.get(pk=pk)
  #       serialized_story = PopulatedStorySerializer(story)
  #       updated_line = StorySerializer(line, data=request.data)  
  #       if updated_line.is_valid():
  #         updated_line.save()
  #         story = Story.objects.get(pk=pk)
  #         serialized_story = PopulatedStorySerializer(story)
  #         return Response(serialized_story.data, status=HTTP_202_ACCEPTED)
  #       return Response(updated_line.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

  def put(self, request, pk):
    #trying to get the lines from all the storys 
        try: 
          story = Story.objects.get(pk=pk)
          serialized_story = PopulatedStorySerializer(story)
          lines = serialized_story.data.get("lines")
          updated_lines = PopulatedStorySerializer(lines, data=request.data)
          if updated_lines.is_valid():
            updated_lines.save()
            # print (updated_story)
            # story = Story.objects.get(pk=pk)
            # serialized_story = PopulatedStorySerializer(story)
            # print(serialized_story)
            return Response(updated_lines.data, status=HTTP_202_ACCEPTED)
          return Response(updated_lines.errors, status=HTTP_422_UNPROCESSABLE_ENTITY) 
        except updated_lines.DoesNotExist:
          return Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)


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

  # def put(self, request, **kwargs):  
  #     request.data['owner'] = request.user.id 
  #     line = Line.objects.get(pk=kwargs['line_pk'])
  #     if line.owner.id != request.user.id:  # quick check to see if the user making the request is the same user who created the post, if not don't allow updates
  #           return Response(status=HTTP_401_UNAUTHORIZED)
  #     updated_line = LineSerializer(line, data=request.data)
  #     if updated_line.is_valid():
  #       updated_line.save()
  #       return Response(updated_line.data, status=HTTP_202_ACCEPTED)
  #     return Response(updated_line.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
    
