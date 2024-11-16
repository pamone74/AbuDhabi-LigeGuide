from django.urls import path
from . import views


urlpatterns = [
    path('api/parking-data/', views.fetch_parking_data, name='fetch_parking_data'),
    path('', views.home, name='home'),
    path('maps/', views.map_view, name='map_view'),
    path('mosque-map/', views.mosque_map, name='mosque_map'),
    path('videoStart/', views.videoStart, name='videoStart'),
]
