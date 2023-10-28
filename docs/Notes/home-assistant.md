

##### Network
````bash
# Setup vpn:
1. Search for the “WireGuard” add-on in the add-on store and install it.
2. Set the host configuration option to your (external) address, e.g., myhome.duckdns.org.
3. Change the name of the peer to something useful, e.g., raspi.
4. Add "port:22" option to config
5. Save the configuration.
6. Start the “WireGuard” add-on
7. Check the logs of the “WireGuard” add-on to see if everything went well.
8. Forward port 51820 (UDP!) in your router to your Hass.io 749IP.
9. Download/Open the file /ssl/wireguard/myphone/qrcode.png stored on your Hass.io 749machine, e.g., using WinSCP ( user: root )
10. Install the WireGuard app on your phone.
11. Add a new WireGuard connection to your phone, by scanning the QR code.
12. Connect!

https://community.home-assistant.io/t/home-assistant-community-add-on-wireguard/134662
````

##### Enable wake on lan on Windows
````bash
Win + R -> ncpa.cpl -> "Ethernet 3" ( change based on your adapter ) -> Properties -> Advanced -> Wake on lan magic packet -> Enable
````

##### Errors
````bash
## When nothing works:
# On the actual device's emergency shell, run:
docker restart homeassistant
````

##### Main homeassistant page
````bash
http://homeassistant.local:8123
````

##### System status page
````bash
http://homeassistant:4357/
````