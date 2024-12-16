from rest_framework import serializers

from userauth.serializers import PlayerSerializer

class CombinedRegistrationSerializer(serializers.Serializer):
    name = serializers.CharField()
    players = PlayerSerializer(many=True)
    email = serializers.EmailField()
    transaction_id = serializers.CharField()
