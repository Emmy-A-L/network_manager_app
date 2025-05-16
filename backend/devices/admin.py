from django.contrib import admin
from .models import Device

class DeviceAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'mac_address', 'hostname', 'last_seen')
    search_fields = ('ip_address', 'mac_address', 'hostname')
    list_filter = ('last_seen',)

admin.site.register(Device, DeviceAdmin)