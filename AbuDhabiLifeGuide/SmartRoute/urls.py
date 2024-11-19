from django.urls import path
from . import views


urlpatterns = [
    path('api/parking-data/', views.fetch_parking_data, name='fetch_parking_data'),
    path('', views.home, name='home'),
    path('maps/', views.map_view, name='map_view'),
    path('mosque-map/', views.mosque_map, name='mosque_map'),
    path('videoStart/', views.videoStart, name='videoStart'),
]

from django.urls import path
from . import views


urlpatterns = [
    path('api/parking-data/', views.fetch_parking_data, name='fetch_parking_data'),
    path('', views.home, name='home'),
    path('maps/', views.map_view, name='map_view'),
    path('mosque-map/', views.mosque_map, name='mosque_map'),
    path('videoStart/', views.videoStart, name='videoStart'),
    # path('recommend/<str:category>/', views.recommend_places, name="recommend_places"),
]
from django.urls import path
from . import views

urlpatterns = [
    path("recommend-worship-church/", views.recommend_worship_church, name="recommend_worship_places"),
    path("recommend-worship-mosque/", views.recommend_worship_mosque, name="recommend_worship_places"),
    path("recommend-worship-shopping/", views.recommend_shopping_places, name="shopping"),
    path("recommend-shopping-places/", views.recommend_shopping_places, name="recommend_shopping_places"),
    path("recommend-tourist-sites/", views.recommend_tourist_sites, name="recommend_tourist_sites"),
    path("recommend-events/", views.recommend_events, name="event"),
    path("booking/", views.parking_page, name="booking"),
    path('book_parking_spot/<int:spot_id>/', views.book_parking_spot, name='book_parking_spot'),
    
]
