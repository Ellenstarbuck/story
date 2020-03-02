from django.urls import path
from .views import RegisterView, LoginView, ProfileDetailView, UsersListView

urlpatterns = [
  path('register', RegisterView.as_view()),
  path('login', LoginView.as_view()),
  path('profile', ProfileDetailView.as_view()),
  path('users', UsersListView.as_view())
]