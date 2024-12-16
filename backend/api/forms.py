from django import forms
from django.core.exceptions import ValidationError

class PlayerForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    batch = forms.CharField(max_length=100)

class CombinedRegistrationForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    transaction_id = forms.CharField(max_length=255)
    players = forms.JSONField()  # This field will handle a JSON array of player data

    def clean_players(self):
        players_data = self.cleaned_data.get('players', [])
        if not isinstance(players_data, list):
            raise ValidationError("Players must be a list of player data.")

        # Validate each player using PlayerForm
        for player_data in players_data:
            player_form = PlayerForm(data=player_data)
            if not player_form.is_valid():
                raise ValidationError(f"Invalid player data: {player_form.errors}")
        return players_data
