# pylint: disable=no-member
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Genre
from .serializers import PopulatedGenreSerializer

class GenreListView(APIView):

    def get(self, _request):
        genres = Genre.objects.all()
        serialized_genres = PopulatedGenreSerializer(genres, many=True)
        return Response(serialized_genres.data)



