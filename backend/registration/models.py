from django.db import models
from django.urls import reverse


status = ( 
            # ( "unpaid", "Payment not made yet" ), 
            ( "pending", "Payment being verified." ), 
            ( "declined", "Transaction Id did not match." ), 
            ( "accepted", "Payment is succesfull." ) 
        )   


class TeamRegistration(models.Model):
    # name = models.CharField(max_length=50)
    team = models.OneToOneField("games.Team", on_delete = models.CASCADE, related_name ="registration", null=True )
    transaction_id = models.CharField("Transaction Id", max_length = 50, null=True, blank=True )
    message = models.TextField( blank = True, null = True )
    # accepted = models.BooleanField( default = False )
    status = models.CharField(default="pending", max_length=50, choices=status)
    
    class Meta:
        verbose_name = "TeamRegistration"
        verbose_name_plural = "TeamRegistrations"

    def __str__(self):
        return f"Reg. for { self.team.name }"

    def get_absolute_url(self):
        return reverse( "team_registration_detail", kwargs= { "pk": self.pk } ) 