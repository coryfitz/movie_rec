from rest_framework import views
from rest_framework.response import Response
import openai
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import RecommenderSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions, mixins
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User

class PublicRecommenderView(views.APIView):
    permission_classes = (AllowAny, )
    def get_response(self, preferences):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Please recommend a movie for me to watch. {preferences}"}
                ]
        )
        return {'response': response['choices'][0]['message']['content']}

    def post(self, request):
        preferences = request.data['preferences']['preferences']['responses']
        yourdata= self.get_response(preferences)
        results = RecommenderSerializer(yourdata).data
        return Response(results)

class UserRecommenderView(views.APIView):
    permission_classes = (IsAuthenticated, )
    def get_response(self, preferences):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Please recommend a movie for me to watch. {preferences}"}
                ]
        )
        return {'response': response['choices'][0]['message']['content']}

    def post(self, request):
        preferences = request.data['preferences']['preferences']['responses']
        yourdata= self.get_response(preferences)
        results = RecommenderSerializer(yourdata).data
        return Response(results)
    
class LogoutView(APIView):
    # permission_classes = (IsAuthenticated,)
     permission_classes = (AllowAny,)
     def post(self, request):
          #try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          #except Exception as e:
            #   return Response(status=status.HTTP_400_BAD_REQUEST)
          

class RegisterApi(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,    context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })