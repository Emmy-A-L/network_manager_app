from django.contrib.auth.models import User
from django.db import models

class AccountProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    hostname = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        AccountProfile.objects.create(user=instance)
