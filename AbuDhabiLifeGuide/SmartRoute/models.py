from django.db import models

from django.db import models

class ParkingSpot(models.Model):
    spot_id = models.AutoField(primary_key=True)  # Unique ID for each spot
    latitude = models.FloatField()  # Latitude of the spot
    longitude = models.FloatField()  # Longitude of the spot
    booked = models.BooleanField(default=False)  # Whether the spot is booked

    def __str__(self):
        return f"Spot {self.spot_id} ({self.latitude}, {self.longitude})"
