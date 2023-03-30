---
title: OSD3358 Linux
date: "2020-07-27T22:28:03.284Z"
description: "Booting Linux on custom PCB"
tags: ["electronics"]
---

This is a project I made some time ago.

![Board finished](./boardFinished.jpg)
Board rev. v1. 

Almost finished board straight out of a reflow oven. USB host port and Click board-header connectors still 
missing, will hand solder them later on. 


Board was developed from scratch following Octavo Systems reference design. 
Multiple components were not available for ordering so it was not possible to just download their 
board design files and order the boards and components.


### Board specs
- **Octavo Systems SiP** ( System In Package OSD3358 ) containing:
  - TI AM335x **ARM Cortex-A8 1GHz**
  - **512MB DDR3** Main memory
  - TPS65217 Power management IC
  - TL5209 Low-dropout voltage regulator
  - 100+ passive components
- **64GB eMMC** ( AM335x supporting only 32GB at the moment )
- SD card slot
- USB-A host port
- Micro-USB client port
- Some buttons and LEDs
- **BeagleBone Debian 10.03** ( with modified u-boot to be able to boot it on the custom board. )


### After reflow soldering, under a magnifying glass
![Board finished](./boardFinished2.jpg)


### Board preview in EAGLE
![Board preview](./OSD3358_linux.png)


### Board layout in EAGLE
- 4 layer board
- 3V3 and GND layers hidden.
- RED = top signal layer
- BLUE = bottom signal layer.
![EAGLE](./eagle.png)


### Board manufacturing process
Ordering process was easy from https://jlcpcb.com/. They have this detailed process log.
![Manufacturing](./pcbManufProcess.PNG)

You can also view videos of each step of the process which was interesting.
![Manufacturing](./pcbManufProcessVideo.PNG)

### Bottom side of the board
![Bottom side](./boardBotNoComponents.jpg)


### Top side of the board without components
![Top side](./boardTopNoComponents.jpg)


### Board taped down to hold it in place
![Board taped to the desk](./tape.jpg)


### Board stencil
![Board stencil](./stencil.jpg)


### About to spread some solder paste
![Solder paste](./solderPaste.jpg)


### Spreading the solder paste on to the board
![Spreading solder paste](./spreadPaste.jpg)


### Solder paste spread on to the board
Picture taken through a magnifying glass.
![Solder paste on board](./solderPasteOnBoard.jpg)


### Some of the components used in the board
![Components](./components.jpg)


### All the components placed, before reflowing
![Components placed](./componentsPlaced.jpg)


### Reflowing the board
Custom reflow controller board controlling **4 x 230V infrared heating** elements through a **3v DC -> 230V AC SSR** ( Solid State Relay ).
Temperature is read through a **K-type thermocouple** connected to **MAX31855** thermocouple-to-digital IC.
![Reflow oven](./reflowOven.jpg)


### Testing reflow oven temperature plot
- ORANGE line = target temperature
- BLUE line = actual temperature.
![Temperature plot](./reflowGraph.png)


### Debugging linux not booting up issue
U-boot not recognizing the board ID because the EEPROM is empty. I had to skip the EEPROM board ID check on u-boot and re-build it.
![Debugging](./debugging.jpg)


### Building u-boot and linux kernel in the middle of the night
![Build U-boot](./buildUboot.jpg)


### Linux booting up for the first time
![Linux booting up](./booting.jpg)


### Links
- <https://jlcpcb.com/>
- <https://www.digikey.com/>
- <https://octavosystems.com/>
- <https://octavosystems.com/app_notes/osd335x-design-tutorial/>
- <https://octavosystems.com/app_notes/osd335x-eeprom-during-boot/#_Toc382081428>