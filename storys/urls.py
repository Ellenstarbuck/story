from django.urls import path
from .views import StoryListView, StoryDetailView

urlpatterns = [
  path('', StoryListView.as_view()),
  path('<int:pk>/', StoryDetailView.as_view()),
]
