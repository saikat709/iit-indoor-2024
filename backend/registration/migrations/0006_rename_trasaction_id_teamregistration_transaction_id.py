# Generated by Django 5.1.4 on 2024-12-14 09:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0005_alter_teamregistration_options'),
    ]

    operations = [
        migrations.RenameField(
            model_name='teamregistration',
            old_name='trasaction_id',
            new_name='transaction_id',
        ),
    ]
