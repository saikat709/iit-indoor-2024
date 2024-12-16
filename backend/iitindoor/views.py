from django.shortcuts import render
from .utils import send_mail_notification

def home( request, *args, **kwargs ):
    # send_mail_notification( "Test mail", "Is it working.....!", "saikatislam709@gmail.com" )
    return render( request, "index.html" )
    