from rest_framework import views
from rest_framework.response import Response

from .serializers import RecommenderSerializer

class RecommenderView(views.APIView):

    def get_response(self):
        return {'response': 'this is a sample chat gpt response'}

    def get(self, request):
        yourdata= self.get_response()
        results = RecommenderSerializer(yourdata).data
        return Response(results)