---
title: Home Assistant
date: "2021-10-21T01:21:03.284Z"
description: "Home Assistant setup."
tags: ["misc"]
---

## What is this?
Some pictures of my old Home Assistant setup that I spent some time to setup.
I have moved since and only setup a few sensor to my new home for a brief
testing of the ventilation of this place.

However I'm planning on moving the Home Assistant setup to my garage, it
will be more useful there. Also it has a simple Wireguard setup so I can
connect to the garage LAN and monitor/control things remotely.

## Notes
<https://protoni.github.io/notes/Notes/home-assistant/>

## Setup
I have a Raspberry pi 3 running the home assistant distro.
Raspberry pi has ConBee2 ( Zigbee ) USB gateway connected.
So the current home assistant setup detects devices from WLAN, LAN and
Zigbee.

It has, or at least had these devices connected:
- Power outlets to control
- Lamps and christmas lights
- Temperature/Humidity sensors
- Water leak sensor
- Movement detector
- LG TV
- Roomba
- Control panel tablet
- Desktop PC

I had also setup wake on lan so I could use Wireguard VPN to connect to the
home network and power on my PC from the home assistant control panel.

## Pictures
Current state. Here most of the sensors are turned off since I moved recently.
![home assistant current](homeAssistantCurrent.png)

Older picture with more devices online
![home assistant online](homeAssistant2.PNG)

Temperature sensor graphs
![home assistant graph](homeAssistant_history.PNG)

I setup this old Android tablet as a control panel
![home assistant wall](homeAssistantWallControlPanel.JPG)

Setting up home assistant and testing some weather cards
![home assistant testing](homeAssistant.PNG)

Testing some christmas light automations
![home assistant automations](homeAssistantAutomations.PNG)