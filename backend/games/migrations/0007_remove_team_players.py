# Generated by Django 5.1.4 on 2024-12-09 20:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_game_player_count'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='team',
            name='players',
        ),
    ]
