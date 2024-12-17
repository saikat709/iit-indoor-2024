import json
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from api.serializers import CombinedRegistrationSerializer
from iitindoor.utils import send_mail_notification

from games.models import Game, Team
from games.serializers import GameSerializer, TeamSerializer
from registration.models import TeamRegistration
from registration.serializers import TeamRegistrationSerializer
from userauth.models import Player
from userauth.serializers import PlayerSerializer
from .forms import CombinedRegistrationForm


# Create your views here.
class GameApiView(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    pagination_class = None

class TeamApiView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    pagination_class = None

class TeamRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = TeamRegistrationSerializer
    queryset = TeamRegistration.objects.all()
    pagination_class = None

class PlayerViewSet(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
    pagination_class = None


@api_view(['POST'])
def mail_send_api(request, *args, **kwargs):

    if request.method != "POST":
        return Response( "GET request not allowed.", status=status.HTTP_400_BAD_REQUEST )

    try:
        to = request.data.get('to')
        msg = request.data.get('message')
        subject = request.data.get('subject')
        send_mail_notification( subject, msg, to )

        return Response( data = "Okay", status = status.HTTP_200_OK)
    except Exception as e:
        return Response( data = str(e), status = status.HTTP_303_SEE_OTHER )


@api_view( [ 'POST' ] )
def registration_combined(request, *args, **kwargs):
    if request.method == "POST":
        print( request.data )

        name = request.data.get( "name" )
        number =  request.data.get( "number" )
        payment_method =  request.data.get( "payment_method" )
        transaction_id = request.data.get("transaction_id" )
        game_id = players = request.data.get( "game_id" ) or 1

        print(transaction_id)

        players = request.data.get("players")

        try:
            game = Game.objects.filter( id = game_id ).first()
            team = Team( name = name, number = number, game = game, payment_method = payment_method )
            team.save()

            for p in players:
                player = Player( name = p.get("name"), email = p.get("email"), batch = p.get("batch"), game = game, team = team )
                player.save()

            registration = TeamRegistration( team = team, transaction_id = transaction_id or None )
            registration.save()
                  
            return Response(
                data = { 'id': team.id },
                status = status.HTTP_201_CREATED 
            )
    
        except Exception as e:
            print( e )
            return Response( "Sended data is not good. Provide required fields.", status = status.HTTP_400_BAD_REQUEST )
     
    return Response( "GET not allowed", status = status.HTTP_400_BAD_REQUEST )