from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    previous_recommendations = models.TextField(blank=True)

    def __str__(self):
        return self.username