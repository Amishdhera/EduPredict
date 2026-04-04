# from rest_framework import generics, status, permissions
# from rest_framework.response import Response
# from django.contrib.auth.models import User, Group
# from .serializers_auth import UserSerializer

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [permissions.AllowAny]
#     serializer_class = UserSerializer

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()

#         # Assign Role (Group)
#         role = request.data.get('role', 'Student')
#         if role not in ['Student', 'Teacher', 'Analyst']:
#             role = 'Student'
        
#         group, _ = Group.objects.get_or_create(name=role)
#         user.groups.add(group)

#         headers = self.get_success_headers(serializer.data)
#         return Response({
#             "user": serializer.data,
#             "role": role,
#             "message": "User created successfully"
#         }, status=status.HTTP_201_CREATED, headers=headers)
# views_auth.py
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from .serializers_auth import UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Assign Role
        role = request.data.get('role', 'Student')
        if role not in ['Student', 'Teacher', 'Analyst']:
            role = 'Student'
        
        group, _ = Group.objects.get_or_create(name=role)
        user.groups.add(group)

        # Create full name
        full_name = user.get_full_name()
        if not full_name:
            full_name = user.username

        user_data = serializer.data
        user_data['name'] = full_name
        user_data['role'] = role

        return Response({
            "user": user_data,
            "role": role,
            "message": "User created successfully"
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({"error": "Invalid credentials"}, status=401)
        
        # Get role
        role = 'Student'
        if user.groups.exists():
            role = user.groups.first().name
        
        # Create full name
        full_name = user.get_full_name()
        if not full_name:
            full_name = user.username
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "name": full_name,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": role
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })