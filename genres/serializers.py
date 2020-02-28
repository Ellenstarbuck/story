from rest_framework import serializers
from storys.models import Story
from .models import Genre

class StorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Story
        fields = ('id', 'title')

class GenreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('id', 'text', 'storys' )

class PopulatedGenreSerializer(GenreSerializer):
    storys = GenreSerializer(many=True)

