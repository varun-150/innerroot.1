from rest_framework import status, views, permissions
from rest_framework.response import Response
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, VerifyOTPSerializer, UserSerializer
import qrcode
import io
import base64

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        
        user = authenticate(email=email, password=password)
        if user:
            if user.is_2fa_enabled:
                return Response({
                    "requires_2fa": True,
                    "email": user.email
                }, status=status.HTTP_200_OK)
            
            tokens = get_tokens_for_user(user)
            return Response({
                "requires_2fa": False,
                "user": UserSerializer(user).data,
                "tokens": tokens
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class VerifyOTPView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        
        try:
            user = User.objects.get(email=email)
            if user.verify_otp(otp):
                tokens = get_tokens_for_user(user)
                return Response({
                    "user": UserSerializer(user).data,
                    "tokens": tokens
                }, status=status.HTTP_200_OK)
            return Response({"error": "Invalid OTP"}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class Enable2FAView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        if not user.otp_base32_secret:
            user.generate_otp_secret()
        
        uri = user.get_totp_uri()
        img = qrcode.make(uri)
        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        return Response({
            "secret": user.otp_base32_secret,
            "qr_code": f"data:image/png;base64,{img_str}"
        })

class Confirm2FAView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        otp = request.data.get('otp')
        user = request.user
        if user.verify_otp(otp):
            user.is_2fa_enabled = True
            user.save()
            return Response({"success": "2FA enabled successfully"})
        return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
