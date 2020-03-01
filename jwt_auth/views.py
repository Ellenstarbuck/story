from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_422_UNPROCESSABLE_ENTITY, HTTP_404_NOT_FOUND, HTTP_401_UNAUTHORIZED
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


class ProfileView(APIView):
  
  def get(self, request, pk):
    try: 
        request.data['username'] = request.user.id 
        print(request.user.id)
        print(User.objects)
        user = User.objects.get(pk=pk)
        if user.owner.id != request.user.id:
          return Response(status=HTTP_401_UNAUTHORIZED)
        serialized_users = UserSerializer(user)
        return Response(serialized_users.data)
    except User.DoesNotExist:
      return  Response({'message': 'Not Found'}, status=HTTP_404_NOT_FOUND)        