from django.contrib import admin
import rest_framework
from django.urls import path, include
from .views import home
from django.conf.urls.static import static
from django.conf import settings

admin.site.site_header = "IIT Indoor 2024 Admin Panel"
admin.site.site_title  = "IIT Indoor 2024 Admin Panel"
admin.site.index_title = "Welcome to IIT Indoor admin panel"

rest_framework.__author__ = "Indoor"


urlpatterns = [
    path('admin/', admin.site.urls, name = "admin" ),
    path(r'', home, name = "home" ),
    path(r'<slug:react_router>', home, name = "home" ),  # match everything
    path('api/', include("api.urls") ),
]

# if settings.DEBUG:
urlpatterns += static( settings.STATIC_URL, document_root = settings.STATIC_ROOT )
urlpatterns += static( settings.MEDIA_URL, document_root = settings.MEDIA_ROOT )