from rest_framework import serializers
from rest_framework import  serializers
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class RecommenderSerializer(serializers.Serializer):
   response = serializers.CharField()

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      fields = ('id','email','password')
      extra_kwargs = {
         'password':{'write_only': True},
      }
    
   def create(self, validated_data):
      user = User.objects.create_user(validated_data['email'], password = validated_data['password'])
      return user

# User serializer
class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      fields = '__all__'