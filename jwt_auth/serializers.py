#pylint: disable = no-member, arguments-differ

from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validation
from django.contrib.auth.hashers import make_password
# import django.contrib.auth.password_validation as validations
# from djnago.core.exceptions import ValidationError
from django.apps import apps
User = get_user_model()
Story = apps.get_model('storys', 'Story')

class StorySerializer(serializers.ModelSerializer): # We make this quick little serializer to populate a posts field on our user. This gives the nice functionality on the profile route that return our user object, along with all the posts they've made

    class Meta:
        model = Story
        fields = ('id', 'title', 'image')

class UserSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True) # the write only parts on these fields ensure our password and confirmation will never be sent out with the profile or login views.
  password_confirmation = serializers.CharField(write_only=True)
  storys = StorySerializer(many=True, required=False)

  def validate(self, data):
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise serializers.ValidationError({ 'password_confirmation': 'does not match'})

    # try: 
    #         validations.validate_password(password=password)
    #     except ValidationError as err: 
    #         raise serializers.ValidationError({'password': err.messages})

    data['password'] = make_password(password)
    return data

# the fields for the user model, password amnd password confirmation are included as they need to be there 
# when we create a user, but they are never sent in a request for one. 
# Note we also include the storys field to show the users storys.


  class Meta:
        model = User
        fields = ('username', 'id', 'email', 'password', 'password_confirmation', 'profile_image', 'storys' , 'bio', 'first_name', 'last_name') 

#Serializer so that the user can edit their profile
class EditSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
    #making sure that everything on the User model is not required when the user wants to edit their profile - giving them options on what they want to change
    extra_kwargs = {'password': {'required': False}, 'image': {'required': False}, 'email': {'required': False}, 'username': {'required': False}, 'first_name':{'required': False}, 'last_name':{'required': False}}


