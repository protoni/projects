##### Beaglebone
````bash
# Default login user
user: debian
pw:   temppwd

## Powering on/off
# Boot linux from the eMMC
Remove SD card and boot

# Boot linux from the SD card
Add SD card, hold USER button down and apply power

# Flash eMMC with SD card
Insert SD card
Hold USER button and connect power
Hold for 5-7seconds

# User LEDs
- USR0 is configured at boot to blink in a heartbeat pattern
- USR1 is configured at boot to light during microSD card accesses
- USR2 is configured at boot to light during CPU activity
- USR3 is configured at boot to light during eMMC accesses
USR0 is on the edge of the board


# Setup beaglebone
http://beagleboard.org/getting-started


# Resolve error 'the current language is not supported by the device driver installation wizard beaglebone'
when trying to install beaglebone drivers

1. Download and setup 7zip
2. Right click BONE_D64.exe -> 7zip -> Extract to BONE_D64\
3. Edit dpinst.xml
4. Add below first <\language> tag:
  <!-- English (Finland) -->
  <language code="0x1000"></language>
5. Run dpinst.exe

This adds the current OS language to the supported languages list.
See all the language codes here:
https://www.ryadel.com/en/microsoft-windows-lcid-list-decimal-and-hex-all-locale-codes-ids/
````