from django.contrib import admin
from .models import Team, Game
from userauth.models import Player

class PlayerInline(admin.TabularInline):  # or use StackedInline for a different style
    model = Player
    extra = 0  # Number of empty forms to display for adding new players

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    inlines = [PlayerInline]


admin.site.register( Game )
# admin.site.register( Team )
