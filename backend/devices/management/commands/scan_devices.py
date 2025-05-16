# devices/management/commands/scan_devices.py

from django.core.management.base import BaseCommand
from scanner.scanner import scan_network
from devices.models import Device
from django.utils.timezone import now


class Command(BaseCommand):
    help = "Scans the local network and updates the device database."

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE("Scanning network..."))

        try:
            scanned_devices = scan_network()
        except Exception as e:
            self.stderr.write(self.style.ERROR(f"Scan failed: {e}"))
            return

        for device in scanned_devices:
            ip = device["ip"]
            mac = device["mac"]
            hostname = device["hostname"]
            timestamp = now()

            obj, created = Device.objects.update_or_create(
                mac_address=mac,
                defaults={
                    "ip_address": ip,
                    "hostname": hostname,
                    "last_seen": timestamp
                }
            )

            if created:
                self.stdout.write(self.style.SUCCESS(f"New device added: {ip} ({mac})"))
            else:
                self.stdout.write(self.style.SUCCESS(f"Updated device: {ip} ({mac})"))

        self.stdout.write(self.style.SUCCESS("Scan complete."))
