# Generated by Django 5.1.4 on 2024-12-06 19:44

import games.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0004_remove_game_player_count_game_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='picture',
            field=models.ImageField(null=True, upload_to=games.models.get_unique_name),
        ),
    ]
