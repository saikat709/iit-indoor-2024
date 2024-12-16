# Generated by Django 5.1.4 on 2024-12-06 17:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Player name')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('batch', models.CharField(choices=[('bsse09', 'BSSE09'), ('bsse10', 'BSSE10'), ('bsse11', 'BSSE11'), ('bsse12', 'BSSE12'), ('bsse13', 'BSSE13'), ('bsse14', 'BSSE14'), ('bsse15', 'BSSE15'), ('bsse16', 'BSSE16')], max_length=50, null=True, verbose_name='Batch')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='players', to='games.game')),
            ],
            options={
                'verbose_name': 'Player',
                'verbose_name_plural': 'Players',
            },
        ),
    ]