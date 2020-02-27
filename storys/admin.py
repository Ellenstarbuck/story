from django.contrib import admin
from .models import Story, Line, Genre

# Register your models here.

admin.site.register(Story)
admin.site.register(Line)
admin.site.register(Genre)