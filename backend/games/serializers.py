from rest_framework import serializers

from userauth.models import Player
from userauth.serializers import PlayerSerializer
from .models import Game, Team



class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer( many = True )

    class Meta:
        model = Team
        fields = [ 'players', 'status', 'name', 'number', 'payment_method', 'game', 'id', 'registration', 'game_type', 'game_name', ] # '__all__'
        read_only_fields = ( 'status', 'game', 'players' )
        extra_kwargs = {
            'status': { 'read_only': True },
        }

    
class GameSerializer(serializers.ModelSerializer):
    teams = TeamSerializer( many = True )
    players = PlayerSerializer( many = True )

    class Meta:
        model = Game
        fields = ['teams', 'entry_fee', 'total_team', 'player_count', 'successfull_registration', 'picture', 'name', 'description', 'players', 'id'] #'__all__'
        read_only_fields = ( 'teams', 'players' )
        extra_kwargs = {
            'teams': { 'read_only': True },
            'players': { 'read_only': True }
        }

