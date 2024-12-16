from django.db import models
from django.urls import reverse

# Create your models here.

# batches = ( 
#     ( "bsse09", "BSSE09" ), ( "bsse10", "BSSE10" ), ( "bsse11", "BSSE11" ), ( "bsse12", "BSSE12" ), 
#     ( "bsse13", "BSSE13" ), ( "bsse14", "BSSE14" ), ( "bsse15", "BSSE15" ), ( "bsse16", "BSSE16" ), 
# )

batches = [ [ "bsse" + "%02d"%i, "BSSE" + "%02d"%i ] for i in range( 1, 17 ) ]

class Player( models.Model ):
    name  =  models.CharField(  "Player name", max_length = 50 )
    email =  models.EmailField( "Email",       max_length = 254 )
    batch =  models.CharField(  "Batch",       max_length = 50, choices = batches, null = True )
    game  =  models.ForeignKey( "games.Game",  on_delete = models.CASCADE, related_name= "players", null = True )
    team  =  models.ForeignKey( "games.Team",  on_delete = models.CASCADE, related_name = "players", null = True )

    class Meta:
        verbose_name = "Player"
        verbose_name_plural =  "Players"

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse( "player_detail", kwargs = { "pk": self.pk } )