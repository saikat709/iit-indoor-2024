from email.mime import base
from posixpath import basename
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ( GameApiView, 
                     TeamApiView, 
                     TeamRegistrationViewSet, 
                     PlayerViewSet, 
                     mail_send_api,
                     registration_combined
)


api_router = DefaultRouter()
api_router.register( "game", GameApiView, basename="game" )
api_router.register( "team", TeamApiView, basename="team" )
api_router.register( "registration", TeamRegistrationViewSet, basename="registration" )
api_router.register( "player", PlayerViewSet, basename="player" )
# api_router.register( "mail", mail_send_api )
# api_router.register( "registration-combined", RegistrationApiView.as_view(), basename="registration-combined" )


# print(api_router.urls)

api_urls = [
    path( "mail/", mail_send_api, name="mail" ),
    path( "registration-combined/", registration_combined, name="registration-combined" )
]

urlpatterns = [
    path("", include( api_router.urls + api_urls ) ),
    # path( "", send_mail_notification, name="mail" ),
    # path( "/registration-combined", RegistrationApiView.as_view(), name="registration-combined" )
]