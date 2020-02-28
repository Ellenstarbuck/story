from django.db import models

# Create your models here.

class Genre(models.Model):
    text = models.CharField(max_length=50) 

    def __str__(self):
        return f'{self.text}'
