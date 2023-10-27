---
title: LED panel
date: "2023-10-27T18:17:37.121Z"
description: "Testing LED panels"
tags: ["Electronics"]
---


I have been working on this LED panel display for a while and here are some
progress pictures.

It's going to be a 97" display with a crisp crisp resolution of 768x576.
So it has about 400k LEDs currently ( 442k when finished ).

Initially I was supposed to create a bit wider display, but turns out these
bending panels are annoying to install and also the 2.5mm LED
pitch does not have the best cost/LED ratio, so I might just leave it this size
( + missing panels from the corner )

Also keep in mind that my camera sucks and the display's picture quality is a lot
better than in these pictures and videos.


## Preview

It's like a moving painting
![Preview](https://i.imgur.com/yEz3WTu.jpg)

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/X82MYjw.mp4" type="video/mp4">
  </video>
</dl>

## Ordering panels
Initial order. 24 LED panels, 4 power supplies and 4 receiver boards + cables
![Order](https://i.imgur.com/0rvW1J2.jpg)

Panel back side
![panelBackSide](https://i.imgur.com/IqYzawL.jpg)

## Testing the panels

Some initial testing with a few panels
![Testing](https://i.imgur.com/q5QnMwL.jpg)
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/1GfA1y6.mp4" type="video/mp4">
  </video>
</dl>

Bending LED panel
![bendingPanel](https://i.imgur.com/yhHgkap.jpg)

Asynchronous at this point, so I can only send a bunch of files for it to
display. 
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/aw2CwCr.mp4" type="video/mp4">
  </video>
</dl>

Also I made an art
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/qTEkhXG.mp4" type="video/mp4">
  </video>
</dl>

Measure the cheap switching power supplies. Seems ok, some small few millivolt noise can be seen. Just wanted to quickly make sure that there's no crazy spikes.
![testPower](https://i.imgur.com/DV01Ndo.jpg)

Test connecting multiple panels
![connectTest](https://i.imgur.com/W0igBUf.jpg)

## Testing multiple receiver cards
Receiver cards can be chained together with RJ45. There's 6 panels per receiver
card
![testChaining](https://i.imgur.com/z5wNeSB.jpg)

Testing power consumption from the switching power supply's mains side. ( 30.4W )
![powerConsumption](https://i.imgur.com/PlXzk8J.jpg)

Test chaining more panels/receivers
![testChaining2](https://i.imgur.com/6d4Qit5.jpg)
![testChaining3](https://i.imgur.com/yqVthRk.jpg)

## Installing

Initially my idea was to build this structure that holds flat iron bars
horizontally

Getting parts for the fame
![frameParts](https://i.imgur.com/LDJzEO8.jpg)

Panels resting on flat iron bars
![panelsOnFrame](https://i.imgur.com/gp9jjiQ.jpg)
![hideBolts](https://i.imgur.com/J1wqB35.jpg)

Something to attach the power supplies and receiver cards to
![powerAndReceiverOnFrame](https://i.imgur.com/mgtQf2U.jpg)
![cutting](https://i.imgur.com/9Ws7iQO.jpg)

## Updated installing plan
I got lazy cutting building the frame for the original idea and I also had an
idea to try and install the panels to this shelf rack that's been sitting here
without actual shelves for about 2 years now.
![shelf](https://i.imgur.com/GSkitoV.jpg)

I thought I would install the power supplies to these boxes, but then decided not
to because they are expensive and the ventilation is bad.
![powerSupplyBox](https://i.imgur.com/C9Jm6Of.jpg)

So I just put the parts directly to the shelf's frame. That'll do for now.
![install](https://i.imgur.com/qbxu9qj.jpg)

Wiring
![wiring](https://i.imgur.com/joQvqB9.jpg)

## Test HDMI

I got this video processor ( Colorlight X1 ) so that the panels would act as an
actual display rather than as a billboard.
![videoProcessor](https://i.imgur.com/BWAu5xm.jpg)

Power on and test chaining the receiver cards
![powerOn](https://i.imgur.com/G7A5SDJ.jpg)

Setup dual display
![testingHdmi](https://i.imgur.com/N60GJdv.jpg)

More panels
![morePanels](https://i.imgur.com/2zoQjAG.jpg)
![morePanels2](https://i.imgur.com/WMElrzX.jpg)
![morePanels3](https://i.imgur.com/QW4IyY2.jpg)
![morePanels4](https://i.imgur.com/CUPTSY8.jpg)

Ran out of panels
![morePanels5](https://i.imgur.com/JlsdWzz.jpg)

## Configuration

Without configuring the panels, they do not look too good with HDMI because it
doesn't shut off the LEDs when the image has a "black pixel". I had to change
this 'better gray' setting in Colorlight's iSet software and also adjust the
GPU's settings to enable this 'YCbCr' option.
![gpuSettings](https://i.imgur.com/O0fI38j.jpg)

With the initial configuration, you can see that the black parts look more like
gray.
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/VSMW47g.mp4" type="video/mp4">
  </video>
</dl>

After adjusting the settings, the black levels are better because the LED's are
turned off
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/UwWQvHb.mp4" type="video/mp4">
  </video>
</dl>

Also when the receiver cards are shipped, they have a weird issue where the image
is flickering so it's unwatchable. I had to revert the firmware to make the fix
the flickering, here are some of my notes. The steps include running some
random dropbox executables, which is a bit sketchy.

Also while fixing the flickering, I used the LEDVISION software to upload my
display configuration files to the receiver cards.

````bash
# Download and install
https://www.dropbox.com/s/gkbvenvsp9r5yqi/LEDUpgrade%20SetUp_4.0.28531.exe

# Didn't need this, but it was instructed to download, so saving the link here
https://www.dropbox.com/s/pynyci8rbcz031q/5A%2011.04.fw

# Net settings
Open LEDUpgrade as admin
Setting -> NIC Setting
Select correct interface
Select it again from the window below
Go back and restart LEDUpgrade
Click Detect Receiver Cards
Receiver should show up
Downgrade firmware only if Receiver Version is > 11.x
Tick Index
Click Upgrade Firmware.. -> Preset Firmware -> normal -> normal-11.09 -> Ok
Wait until the downgrade is done
Power cycle the board for 10sec
Click 'Detect Receiver Cards' again and verify that the version is 11.x
Close LEDUpgrade
````

Some other notes
````bash
# Upload configuration
Open LEDVision
Control -> LED Screen Settings -> Password is 168
Select Net Card tab -> Use Net Card -> Select correct controller
Click 'Detect Receiver Cards'
Click 'Receiver Parameters' tab
Click 'Load' and browser the .rcvbp file
Click 'Save to Receivers'
Close LEDVision
````

Calculating what would be the best LED amount per $ spent. Unfortunately I did
this only after ordering the first batch of 2.5mm pitch panels.
````bash
## Best LED/$ ratio
## = P1.86
## = 524.53 LED/$

# P1.66
323.46 LED/$

# P1.86
524.53 LED/$

# P2
500 LED/$

# P2.5
413.73 LED/$

# P3.076
321.90 LED/$

# P4
266.66 LED/$

# P5
222.60 LED/$
````

````bash
# Measuring the size of the display
d = distance from corner to corner diagonally
w = width
h = height

d = √(w² + h²)

e.g.
√(2560mm² + 960mm²)
= 2734.08mm
= 2734.08 * 0.03937
= 107.64"

√(2560mm² + 1440mm²)
= 2937.20
= 2937.20 * 0.03937
= 115.63"

√(1920mm² + 1440mm²)
= 2400.00
= 2400.00 * 0.03937
= 94.48"

https://www.omnicalculator.com/math/diagonal-of-rectangle
````

Calculating some prices for different size displays. This was before I found out
that the 1.86mm pitch panels has way better € to pixel ratio. So calculating the
price for these resolutions would be cheaper with those. Also non bending
panels are a few $ cheaper per panel.
````bash
# Module definition
1 'module' = 2 * 3 panels, 2 wide, 3 height

# Module size
Width per one 'module'   = 320mm * 2 = 640mm ( 256 pixel )
Height per one 'module'  = 160mm * 3 = 480mm ( 192 pixel )

# Module price
1 'module' price ~250€

# Display sizes
2x2 = 1280mm x 960mm  =  512 x 384 resolution = 1000€
4x2 = 2560mm x 960mm  = 1024 x 384 resolution = 2000€
4x3 = 2560mm x 1440mm = 1024 x 576 resolution = 3000€

# HD display 1280p x 720p:
4x4 = 3200mm x 1920mm = 1024 x 768 resolution = 4000€

# Diablo2 original max resolution:
2.5x2.3 = 1600mm x 1104mm = 640 x 512 = 1437€

# Diablo2 expansion max resolution:
3x3 = 1920mm x 1440mm = 768 x 576 = 2250
````

## Summary

It's becoming too pricey adventure so I think I'll just order the missing corner panels and leave it like that. The thing cost me about 1800€ including shipping
so far.

Maybe wait for the technology to advance and € per pixel cost to drop and build
and bigger display with better resolution and straight panels, instead of these
bending ones.

Here's some WoW lofi beats
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/sWwFXMX.mp4" type="video/mp4">
  </video>
</dl>
Credits to: <https://www.youtube.com/watch?v=Lg21MW4_suQ>