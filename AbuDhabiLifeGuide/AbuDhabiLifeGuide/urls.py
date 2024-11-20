"""
URL configuration for AbuDhabiLifeGuide project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# myproject/urls.py (or your main project URL file)

from django.contrib import admin
from django.urls import path, include
from SmartRoute import views  # Import your views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('SmartRoute/', include('SmartRoute.urls')),
    path("recommend-worship-church/", views.recommend_worship_church, name="recommend_worship_church"),
    path("recommend-worship-mosque/", views.recommend_worship_mosque, name="recommend_worship_mosque"),
    path("recommend-shopping-places/", views.recommend_shopping_places, name="shopping"),
    path("recommend-tourist-sites/", views.recommend_tourist_sites, name="recommend_tourist_sites"),
    path("recommend-events/", views.recommend_events, name="event"),
    path('book_parking_spot/<int:spot_id>/', views.book_parking_spot, name='book_parking_spot'),
    path("booking/", views.parking_page, name="booking"),
]


