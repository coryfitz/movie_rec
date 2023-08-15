from rest_framework import views
from rest_framework.response import Response
import openai
import json
import ast
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import RecommenderSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from .models import CustomUser

class PublicRecommenderView(views.APIView):
    permission_classes = (AllowAny, )
    def get_api_response(self, preferences):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Please recommend one movie for me to watch based on my preferences: {preferences} Please don't recommend more than one film."}
                ]
        )
        return {'response': response['choices'][0]['message']['content']}

    def post(self, request):
        preferences = request.data['preferences']['preferences']['responses']
        yourdata= self.get_api_response(preferences)
        results = RecommenderSerializer(yourdata).data
        return Response(results)

class UserRecommenderView(views.APIView):
    permission_classes = (IsAuthenticated, )

    def get_api_response(self, preferences, previous_recommendations):
        previous_recommendations = ast.literal_eval(previous_recommendations)
        previous_recommendations = ', '.join(previous_recommendations)

        prompt = f"Please recommend one movie for me to watch based on my preferences: {preferences} Please don't recommend more than one film. Don't recommend any of the following: {previous_recommendations}"
        print(prompt)

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ]
        )
        return {'response': response['choices'][0]['message']['content']}
    
    def get_previous_recommendations(self, user):
        previous_recommendations = user.previous_recommendations
        if not previous_recommendations:
            previous_recommendations = '[]'
        return previous_recommendations
    
    def get_updated_previous_responses(self, api_response, previous_recommendations):
        response = api_response['response']
        recommended_movie = response.split("\"")[1]
        if recommended_movie[-1] == '.':
            recommended_movie = recommended_movie[:-1]
        updated_previous_recommendations = json.loads(previous_recommendations)
        updated_previous_recommendations.append(recommended_movie)
        return updated_previous_recommendations

    def post(self, request):
        user = CustomUser.objects.get(username=request.user)
        previous_recommendations = self.get_previous_recommendations(user)
        preferences = request.data['preferences']['preferences']['responses']
        api_response = self.get_api_response(preferences, previous_recommendations)
        updated_previous_recommendations = self.get_updated_previous_responses(api_response, previous_recommendations)
        user.previous_recommendations = json.dumps(updated_previous_recommendations)
        user.save()
        results = RecommenderSerializer(api_response).data
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