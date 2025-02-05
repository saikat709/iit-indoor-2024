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
            name='TeamRegistration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('trasaction_id', models.CharField(max_length=50, verbose_name='Transaction Id')),
                ('status', models.CharField(choices=[('unpaid', 'Payment not made yet'), ('pending', 'Payment being verified'), ('completed', 'Payment is succesfull')], default='unpaid', max_length=50)),
                ('team', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='registration', to='games.team')),
            ],
            options={
                'verbose_name': 'TeamRegistration',
                'verbose_name_plural': 'TeamRegistration',
            },
        ),
    ]
