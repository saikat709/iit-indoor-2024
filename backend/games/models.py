from django.db import models
from django.urls import reverse

import uuid
import os
from datetime import datetime


def get_unique_name( file ):
    root = 'images/'
    ext = str(file).split('.')[-1]
    file_name = uuid.uuid4()
    return os.path.join(root, file_name + ext )


def get_unique_name(instance, filename):
    """
    Generates a unique name for the uploaded file.
    
    args:
        instance: The instance of the model where the file is being attached.
        filename: The original filename of the uploaded file.

    return:
        str: A unique file path for the uploaded file.
    """
    extension = os.path.splitext(filename)[1]
    unique_name = f"{instance.id}_{ uuid.uuid4().hex }_{ datetime.now().strftime('%Y%m%d%H%M%S') }{ extension }"
    return f"images/{unique_name}"


types = ( 
    ("single", "Single Player"),
    ('dual', "Team of Two" )
)

class Game( models.Model ):
    name = models.CharField( max_length = 50 )
    description = models.TextField( blank = True, null = True )
    picture = models.ImageField( upload_to =  get_unique_name, null = True )
    player_count = models.IntegerField( default = 2 )
    total_team = models.IntegerField( default = 10 )
    entry_fee = models.IntegerField( default = 200 )
    
    class Meta:
        verbose_name = "Game"
        verbose_name_plural = "Games"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("games/", kwargs={ "pk": self.pk })
    
    @property
    def successfull_registration(self):
        abc = 0
        for t in self.teams.all():
            if t.status== 'accepted':
                abc += 1
        return abc


class Team(models.Model):
    name = models.CharField( max_length = 50 )
    team_email = models.CharField( max_length = 50 )
    game = models.ForeignKey( "games.Game", on_delete = models.CASCADE, related_name="teams" )
    # players = models.OneToOneField( "userauth.Player", on_delete=models.CASCADE, related_name="team", null=True )
    
    class Meta:
        verbose_name = "Team"
        verbose_name_plural = "Teams"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("Team_detail", kwargs={"pk": self.pk})
    
    @property
    def status(self):
        return self.registration.status
    
    @property
    def game_name(self):
        return self.game.name

    @property
    def game_type(self):
        if self.game.player_count == 1:
            return "single"
        elif self.game.player_count == 2:
            return "double"
        else:
            return "multi"
