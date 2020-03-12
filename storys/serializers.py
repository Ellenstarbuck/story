from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Story, Line
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
      model = User
      fields = ('id', 'username')


class StorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Story
        fields = '__all__'

class LineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Line
        fields = '__all__'

#populated serializers, which bring through the information to the user rather than returning integers
#a way of prepopulated requests when they are returned to the user
class PopulatedLineSerializer(LineSerializer):
    owner = UserSerializer()

class PopulatedStorySerializer(StorySerializer):
    owner = UserSerializer()
    lines = PopulatedLineSerializer(many=True)
