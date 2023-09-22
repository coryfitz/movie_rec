from django.urls import path
from . import views
from .views import PublicRecommenderView, RegisterApi

urlpatterns = [
     path('api/', PublicRecommenderView.as_view(), name='public_recommender'),
     path('logout/', views.LogoutView.as_view(), name ='logout'),
     path('api/register/', RegisterApi.as_view()),
]