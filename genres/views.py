# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from .models import Genre
from .serializers import PopulatedGenreSerializer

class GenreListView(APIView):

    def get(self, _request):
        genres = Genre.objects.all()
        serialized_genres = PopulatedGenreSerializer(genres, many=True)
        return Response(serialized_genres.data)

class GenreDetailView(APIView):

    def get(self, _request, pk):
      try: 
        genre = Genre.objects.get(pk=pk)
        serialized_genres = PopulatedGenreSerializer(genre)
        return Response(serialized_genres.data)
      except Genre.DoesNotExist:
        return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)  