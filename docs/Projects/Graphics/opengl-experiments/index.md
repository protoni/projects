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

![Window open](./windowOpen.PNG)

### Got a triangle to the screen 😀
![Triangle](./triangle.PNG)

### Triangle moving
![Triangle moving](./triangleMoving.gif)

### Interpolate
Triangle got some color and a z axis. The GIF looks a bit weird on this one.

![Triangle rotating](./triangleRotating3d.gif)

### Camera
Camera, keyboard and mouse control added.

![Camera](./triangleCamera.gif)

### Texture
Texture loading done using stb_image.h loader.
Also forgot to mention earlier that I'm using math library called glm.

![Textures](./textures.gif)

### Lighting
Got some lights going on.
- Directional lights
- Ambient lighting
- Diffuse lighting
- Specular lighting
- Point lights

![Lights](./PointLights2.gif)

### Spotlight following a camera.

![Spotlight](./SpotLight4.gif)

### Model importing
Random models from <https://free3d.com>
![Model importing](./modelImport3.gif)

Orgrimmar from World of Warcraft
<dl>
  <video width="640" height="480" controls>
    <source src="orgrimmar.mp4" type="video/mp4">
  </video>
</dl>

### Links
- <https://www.udemy.com/course/graphics-with-modern-opengl/>
- <https://free3d.com>