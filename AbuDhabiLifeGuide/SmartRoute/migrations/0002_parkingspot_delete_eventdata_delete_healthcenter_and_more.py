# Generated by Django 5.1.3 on 2024-11-18 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SmartRoute", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ParkingSpot",
            fields=[
                ("spot_id", models.AutoField(primary_key=True, serialize=False)),
                ("latitude", models.FloatField()),
                ("longitude", models.FloatField()),
                ("booked", models.BooleanField(default=False)),
            ],
        ),
        migrations.DeleteModel(
            name="EventData",
        ),
        migrations.DeleteModel(
            name="HealthCenter",
        ),
        migrations.DeleteModel(
            name="ParkingData",
        ),
    ]