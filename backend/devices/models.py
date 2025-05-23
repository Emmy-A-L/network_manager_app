from django.db import models

# Create your models here.

class Device(models.Model):
    ip_address = models.GenericIPAddressField()
    mac_address = models.CharField(max_length=32)
    hostname = models.CharField(max_length=255, blank=True)
    last_seen = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.hostname or 'Unknown'} ({self.ip_address})"