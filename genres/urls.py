from django.urls import path
from .views import GenreListView, GenreDetailView

urlpatterns = [
    path('', GenreListView.as_view()), #showing all genres
    path('<int:pk>/', GenreDetailView.as_view()) #showing one genres
]