from django.urls import path
from .views import StoryListView, StoryDetailView, LineDetailView, LineListView

urlpatterns = [
  path('', StoryListView.as_view()),
  path('<int:pk>/', StoryDetailView.as_view()),
  path('<int:pk>/lines/', LineListView.as_view()),
    path('<int:pk>/lines/<int:line_pk>/', LineDetailView.as_view())
]
