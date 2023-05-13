from rest_framework import views
from rest_framework.response import Response
import openai

from .serializers import RecommenderSerializer

class RecommenderView(views.APIView):

    def get_response(self, preferences):
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": f"Please recommend a movie for me to watch. {preferences}"}
                ]
        )

        return {'response': response['choices'][0]['message']['content']}

    def get(self, request):
        preferences = "I prefer serious movies, I prefer thinking about the future, and I'm ok watching movies with subtitles"
        preferences = request.POST.get('preferences')
        
        print(preferences)
        yourdata= self.get_response(preferences)
        results = RecommenderSerializer(yourdata).data
        return Response(results)
    
