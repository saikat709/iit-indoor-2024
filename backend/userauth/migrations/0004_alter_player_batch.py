# Generated by Django 5.1.4 on 2024-12-17 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userauth', '0003_player_team_alter_player_game'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='batch',
            field=models.CharField(choices=[('bsse01', 'BSSE01'), ('bsse02', 'BSSE02'), ('bsse03', 'BSSE03'), ('bsse04', 'BSSE04'), ('bsse05', 'BSSE05'), ('bsse06', 'BSSE06'), ('bsse07', 'BSSE07'), ('bsse08', 'BSSE08'), ('bsse09', 'BSSE09'), ('bsse10', 'BSSE10'), ('bsse11', 'BSSE11'), ('bsse12', 'BSSE12'), ('bsse13', 'BSSE13'), ('bsse14', 'BSSE14'), ('bsse15', 'BSSE15'), ('bsse16', 'BSSE16')], max_length=50, null=True, verbose_name='Batch'),
        ),
    ]