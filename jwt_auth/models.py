from django.db import models
from django.contrib.auth.models import AbstractUser

# User model - using the custom model that Django gives us

class User(AbstractUser):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)
  email = models.CharField(max_length=50, unique=True)
  profile_image = models.CharField(max_length=500, blank=True)
  bio = models.CharField(max_length=500, blank=True)