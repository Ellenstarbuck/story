from django.urls import path
from .views import StoryListView, StoryDetailView, LineDetailView, LineListView

urlpatterns = [
  path('', StoryListView.as_view()), #showing all stories
  path('<int:pk>/', StoryDetailView.as_view()), #showing one story
  path('<int:pk>/lines/', LineListView.as_view()), #showingaline
  path('<int:pk>/lines/<int:line_pk>/', LineDetailView.as_view()) #deleting a line
]
