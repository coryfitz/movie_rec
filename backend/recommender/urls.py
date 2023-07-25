from django.urls import path
from . import views
from .views import RegisterApi

urlpatterns = [
     path('logout/', views.LogoutView.as_view(), name ='logout'),
     path('api/register/', RegisterApi.as_view()),
]