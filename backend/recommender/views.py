from rest_framework import views
from rest_framework.response import Response
import openai

from .serializers import RecommenderSerializer

class RecommenderView(views.APIView):

    def __init__(self):
        self.preferences = None

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
        self.preferences = request.POST.get('preferences')
        print(f'preferences: {self.preferences}')

    def get(self):
        yourdata= self.get_response(self.preferences)
        results = RecommenderSerializer(yourdata).data
        return Response(results)