from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED, HTTP_202_ACCEPTED
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
      serialized_user = UserSerializer(data=request.data)
      if serialized_user.is_valid():
          serialized_user.save()
          return Response({'message': 'Registration Succesful'})

      return Response(serialized_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
  
    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)

            if not user.check_password(password):
                raise PermissionDenied({'message': 'Invalid Credentails'})

            dt = datetime.now() + timedelta(days=7)
            token = jwt.encode({'sub': user.id, 'exp': int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')

            return Response({'token': token, 'message': f'Welcome back {user.username}'})

        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentails'})


class ProfileDetailView(APIView):
  #get a single profile
          
    def get(self, request):
      user = request.user 
      serializer = UserSerializer(user)
      return Response(serializer.data)

    #edit a profile
    def put(self, request):
        try:
          user = request.user
          updated_user = UserSerializer(user, data=request.data)
          if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=HTTP_202_ACCEPTED)
          return Response(updated_user.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)
        except User.DoesNotExist:
          return Response({'message': 'UNAUTHORIZED'}, status=HTTP_401_UNAUTHORIZED)   

class UsersListView(APIView):
  #list all profiles
        def get(self, request):
          users = User.objects.all()
          serializer_user = UserSerializer(users, many=True) 
          return Response(serializer_user.data)        