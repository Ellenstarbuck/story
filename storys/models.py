from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class Story(models.Model): 
  title = models.CharField(max_length=50)
  lines = models.CharField(max_length=400)
  age_rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(8), MaxValueValidator(12)]) 
  image = models.CharField(max_length=200)
  

  def __str__(self):
    return f'{self.title} - {self.lines}'
