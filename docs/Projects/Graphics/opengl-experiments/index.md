---
title: OpenGL experiments
date: "2020-07-27T17:33:37.121Z"
description: "Testing OpenGL"
tags: ["graphics"]
---

I was doing this OpenGL course on Udemy a while ago and here is the progress so far.

### Got a window open.
Had to setup first:

- Microsoft Visual Studio 2019
- GLEW ( OpenGL Extension Wrangler )
- GLFW ( OpenGL FrameWork )
- Code to init GLEW and GLFW

![Window open](https://i.imgur.com/WUSWYxo.png)

### Got a triangle to the screen 😀
![Triangle](https://i.imgur.com/wsLsHNw.png)

### Triangle moving
![Triangle moving](https://i.imgur.com/U8K1Vne.gif)

### Interpolate
Triangle got some color and a z axis. The image looks a bit weird on this one.

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/MWMohqv.mp4" type="video/mp4">
  </video>
</dl>

### Camera
Camera, keyboard and mouse control added.

![Textures](https://i.imgur.com/y6Eg7Ap.gif)

### Texture
Texture loading done using stb_image.h loader.
Also forgot to mention earlier that I'm using math library called glm.

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/4esZmG4.mp4" type="video/mp4">
  </video>
</dl>

### Lighting
Got some lights going on.
- Directional lights
- Ambient lighting
- Diffuse lighting
- Specular lighting
- Point lights

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/4wZSBkc.mp4" type="video/mp4">
  </video>
</dl>

### Spotlight following a camera.

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/57E3JKU.mp4" type="video/mp4">
  </video>
</dl>

### Model importing
Random models from <https://free3d.com>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/p4x2ito.mp4" type="video/mp4">
  </video>
</dl>

Orgrimmar from World of Warcraft
<dl>
  <video width="640" height="480" controls>
    <source src="https://i.imgur.com/ktDADTy.mp4" type="video/mp4">
  </video>
</dl>

### Links
- <https://www.udemy.com/course/graphics-with-modern-opengl/>
- <https://free3d.com>