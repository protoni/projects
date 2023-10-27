---
title: Custom Graphics Renderer
date: "2022-07-27T17:33:37.121Z"
description: "Custom Graphics Renderer"
tags: ["graphics"]
---

### Description
Here is some progress pictures from a graphics renderer project that I was working on a year ago while learning graphics programming. I was mainly focused on OpenGL, but the idea was to write a general graphics/game engine and add a Vulkan API support for it too.

#### Testing mesh repeater settings
![Obj settings](https://i.imgur.com/xqnpaFV.png)

#### Testing instancing ( copying all vertex data to GPU and drawing only once )
![Instancing](https://i.imgur.com/srhx4Av.png)
![Instancing2](https://i.imgur.com/pE1QV93.png)

#### Mesh pointer
The grid can be navigated by moving around the pointer with keyboard.
![Instancing](https://i.imgur.com/ayOAnFL.png)

#### Modifying individual mesh properties in a mesh grid
The idea here was that each mesh, or an object would have this 'repeater' setting built in, so that they could be copied to all directions, add padding, rotating and scaling them individually just changing the configs. 
![Grid modifying](https://i.imgur.com/eGbsnU3.png)

#### Multi select
Meshes can be multi-selected in the 'repeater' grid, and adjusting the transformations all at once.
![Multiselect](https://i.imgur.com/SqDj5cE.png)
![Multiselect2](https://i.imgur.com/1QiaszQ.png)

#### Materials
Testing materials
![Materials](https://i.imgur.com/UH6PhDT.png)
![Material Instancing](https://i.imgur.com/m2XJ1PD.png)

#### Textures
Testing texture loading.
![Textures](https://i.imgur.com/uvuC06X.png)

#### Models
Testing 3D model loading
![Models](https://i.imgur.com/8bmUCeD.png)
![Models2](https://i.imgur.com/7ANxYzC.png)
![Models3](https://i.imgur.com/Wfrp5CU.png)

#### Lighting
Implemented the Phong lighting model, which consists of different components; ambient, specular and diffuse lighting.
These are all calculated in the fragment shader.

Here are different types of lights:

##### Directional lights ( diffuse )
Ambient light is also present, otherwise the unlit side of the boxes would be completely black and the texture would not show up.
![Directional Light](https://i.imgur.com/RXKXL0t.png)

##### Specular maps
This adds the 'metal' effect to the texture
![Specular](https://i.imgur.com/tBNLL63.png)

##### Pointlight fadeout
![Pointlight Fadeout](https://i.imgur.com/uFrV0ZV.png)

##### Spotlight
![Spotlight](https://i.imgur.com/FGyWgxR.png)

##### Multiple different lights
![MultiLights](https://i.imgur.com/m6flOFt.png)

##### Multiple point lights
![MultiPointLights](https://i.imgur.com/dIoclw6.png)

#### Physics
Testing the 'Bullet' real-time physics simulation engine
![Physics](https://i.imgur.com/NpjBNIF.png)
![Physics2](https://i.imgur.com/Jsp5zyJ.png)

#### Terrain
Testing terrain generation with berlin noise

##### Something's not right
![Terrain](https://i.imgur.com/RYzgdB4.png)
![Terrain2](https://i.imgur.com/hKLbvCb.png)
![Terrain3](https://i.imgur.com/6z2n20s.png)


#### Refactoring
At this point the test code base structure was getting a bit out of hand and I decided to start designing a little bit how it would work better. I was thinking that the renderer would work as an 'engine' library, separately from the game or other use case. I also moved to a ECS ( Entity Component System ) based system, which optimizes the CPU cache for handling the data. I also started to think about how to abstract the graphics API so that Vulkan API could be added later on to the engine.

##### Some terrain and cubes from the new 'engine' library added to the scene
![ECS](https://i.imgur.com/7eV31hW.png)
