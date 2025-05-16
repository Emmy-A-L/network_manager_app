from django.shortcuts import render
from django.contrib.auth.decorators import login_required, user_passes_test
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Device
from scanner.scanner import scan_network
from django.utils.timezone import now

def is_admin(user):
    return user.is_authenticated and user.is_staff

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@user_passes_test(is_admin)
def scan_results(request):
    try:
        # Perform a new scan
        scanned_devices = scan_network()
        
        # Update database
        for device in scanned_devices:
            Device.objects.update_or_create(
                mac_address=device['mac'],
                defaults={
                    'ip_address': device['ip'],
                    'hostname': device['hostname'],
                    'last_seen': now()
                }
            )
        
        # Return all devices
        devices = Device.objects.all().values('ip_address', 'mac_address', 'hostname', 'last_seen')
        return Response({'devices': list(devices)}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {'error': f'Scan failed: {str(e)}'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
