from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Story, Line
from genres.models import Genre
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username')

class GenreSerializer(serializers.ModelSerializer): # For now just making a serializer for populated cateogies. This app doesn't have a route for creating categories so this should be all we need

    class Meta:
        model = Genre 
        fields = '_all_'   


class StorySerializer(serializers.ModelSerializer):

  class Meta:
      model = Story
      fields = '__all__'

class LineSerializer(serializers.ModelSerializer):

  class Meta:
      model = Line
      fields = '__all__'

class PopulatedLineSerializer(LineSerializer):
  owner = UserSerializer()

class PopulatedStorySerializer(StorySerializer):
    owner = UserSerializer()
    lines = PopulatedLineSerializer(many=True)
    genre = GenreSerializer(many=True)