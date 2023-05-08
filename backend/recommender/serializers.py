from rest_framework import serializers

class RecommenderSerializer(serializers.Serializer):
   response = serializers.CharField()