"""
Scans the local network using scapy's ARP Ping sweep.
Returns a list of devices with their ip, mac, hostname, and timestamp.
"""

from scapy.all import ARP, Ether, srp
from datetime import datetime
import socket
from typing import List, Dict



def scan_network(subnet:str = '192.168.1.0/24') -> List[Dict[str, str]]:
    """
    Sends ARP requests to the entire subnet to find active hosts.

    Args:
        subnet(str): The CIDR range to scan, e.g; '192.168.1.0/24'

    Returns:
        List of dicts with IP, MAC, hostname, and timestamp.
    """

    # Ethernet frame (broadcast) = ARP packet
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    arp = ARP(pdst=subnet)
    packet = ether / arp

    result = srp(packet, timeout=3, verbose=0)[0] #send and receive

    devices = []
    for sent, received in result:
        ip = received.psrc
        mac = received.hwsrc
        try:
            hostname = socket.gethostbyaddr(ip)[0]
        except socket.herror:
            hostname = "Unknown"

        devices.append({
            "ip": ip,
            "mac": mac,
            "hostname": hostname,
            "timestamp": datetime.utcnow().isoformat()
        })

    return devices


if __name__=="__main__":
    import json
    scanned = scan_network()
    print(json.dumps(scanned, indent=4))