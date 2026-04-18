from django.db import models
from django.contrib.auth.models import AbstractUser
import pyotp

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_2fa_enabled = models.BooleanField(default=False)
    otp_base32_secret = models.CharField(max_length=32, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def generate_otp_secret(self):
        self.otp_base32_secret = pyotp.random_base32()
        self.save()

    def get_totp_uri(self):
        return pyotp.totp.TOTP(self.otp_base32_secret).provisioning_uri(
            name=self.email,
            issuer_name="AntigravityAuth"
        )

    def verify_otp(self, otp):
        totp = pyotp.totp.TOTP(self.otp_base32_secret)
        return totp.verify(otp)
