from rest_framework import serializers
from recommender import models
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class RecommenderSerializer(serializers.Serializer):
   response = serializers.CharField()

class RegisterSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.CustomUser
      fields = ('id','email','password')
      extra_kwargs = {
         'password':{'write_only': True},
      }
    
   def create(self, validated_data):
      user = models.CustomUser.objects.create_user(validated_data['email'], password = validated_data['password'])
      return user
   
class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.CustomUser
      fields = '__all__'