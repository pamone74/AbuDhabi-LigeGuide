from django.db import models

class ParkingData(models.Model):
    location = models.CharField(max_length=255)
    available_spaces = models.IntegerField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class HealthCenter(models.Model):
    name = models.CharField(max_length=255)
    services = models.TextField()
    rating = models.FloatField()
    insurance_providers = models.TextField()
    location = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()

class EventData(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    date = models.DateTimeField()
    category = models.CharField(max_length=255)
