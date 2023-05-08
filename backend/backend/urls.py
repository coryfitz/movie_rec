from django.contrib import admin
from django.urls import path
from recommender.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/recommender/', RecommenderView.as_view()),
]
