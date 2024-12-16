# Generated by Django 5.1.4 on 2024-12-14 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0007_alter_teamregistration_transaction_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='teamregistration',
            name='accepted',
        ),
        migrations.AddField(
            model_name='teamregistration',
            name='status',
            field=models.CharField(choices=[('pending', 'Payment being verified'), ('declined', 'Transaction Id did not match'), ('accepted', 'Payment is succesfull')], default='pending', max_length=50),
        ),
    ]
