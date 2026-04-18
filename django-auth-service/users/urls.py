from django.urls import path
from .views import RegisterView, LoginView, VerifyOTPView, Enable2FAView, Confirm2FAView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('setup-2fa/', Enable2FAView.as_view(), name='setup-2fa'),
    path('confirm-2fa/', Confirm2FAView.as_view(), name='confirm-2fa'),
]
