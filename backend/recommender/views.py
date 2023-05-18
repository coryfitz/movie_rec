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

        print(response)

        return {'response': response['choices'][0]['message']['content']}

    def post(self, request):
        preferences = request.data['preferences']['preferences']['responses']
        self.request.session['preferences'] = preferences
        print(self.request.session['preferences'])
        return Response()

    def get(self, request):
        preferences = self.request.session.get('preferences') 
        yourdata= self.get_response(preferences)
        results = RecommenderSerializer(yourdata).data
        return Response(results)