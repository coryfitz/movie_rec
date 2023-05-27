from django.contrib import admin
from django.urls import path, include, re_path
from recommender.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/recommender/', RecommenderView.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/dj-rest-auth/', include('dj_rest_auth.urls')),
]
