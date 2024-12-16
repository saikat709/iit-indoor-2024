from rest_framework import serializers

from games.serializers import GameSerializer, TeamSerializer
from .models import TeamRegistration

class TeamRegistrationSerializer(serializers.ModelSerializer):
    team = TeamSerializer()
    # game = GameSerializer()

    class Meta:
        model = TeamRegistration
        fields = '__all__' 
    