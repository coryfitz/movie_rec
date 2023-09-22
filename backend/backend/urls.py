from django.contrib import admin
from django.urls import path, include
from recommender.views import *
from rest_framework_simplejwt import views as jwt_views
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include('recommender.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('api/public-recommender/', PublicRecommenderView.as_view()),
    path('api/user-recommender/', UserRecommenderView.as_view()),
    path('token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
     path('token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh')
]