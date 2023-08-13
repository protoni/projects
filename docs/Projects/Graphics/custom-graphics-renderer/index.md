---
title: Custom Graphics Renderer
date: "2022-07-27T17:33:37.121Z"
description: "Custom Graphics Renderer"
tags: ["graphics"]
---

### Description
Here is some progress pictures from a graphics renderer project that I was working on a year ago while learning graphics programming. I was mainly focused on OpenGL, but the idea was to write a general graphics/game engine and add a Vulkan API support for it too.

#### Testing mesh repeater settings
![Obj settings](./openGlObjSettings.PNG)

#### Testing instancing ( copying all vertex data to GPU and drawing only once )
![Instancing](./openGLInstancing.PNG)
![Instancing2](./openGLInstancing2.PNG)

#### Mesh pointer
The grid can be navigated by moving around the pointer with keyboard.
![Instancing](./meshPointer.PNG)

#### Modifying individual mesh properties in a mesh grid
The idea here was that each mesh, or an object would have this 'repeater' setting built in, so that they could be copied to all directions, add padding, rotating and scaling them individually just changing the configs. 
![Grid modifying](./separateMeshTransformations.PNG)

#### Multi select
Meshes can be multi-selected in the 'repeater' grid, and adjusting the transformations all at once.
![Multiselect](./multiSelect.PNG)
![Multiselect2](./multiSelectModifying.PNG)

#### Materials
Testing materials
![Materials](./materials.PNG)
![Material Instancing](./materialsWithInstancing.PNG)

#### Textures
Testing texture loading.
![Textures](./cubeStackWithTextures.PNG)

#### Models
Testing 3D model loading
![Models](./modelLoading.PNG)
![Models2](./modelLoading2.PNG)
![Models3](./modelLoading3.PNG)

#### Lighting
Implemented the Phong lighting model, which consists of different components; ambient, specular and diffuse lighting.
These are all calculated in the fragment shader.

Here are different types of lights:

##### Directional lights ( diffuse )
Ambient light is also present, otherwise the unlit side of the boxes would be completely black and the texture would not show up.
![Directional Light](./directionalLight.PNG)

##### Specular maps
This adds the 'metal' effect to the texture
![Specular](./specularMaps.PNG)

##### Pointlight fadeout
![Pointlight Fadeout](./fadeoutPointlight.PNG)

##### Spotlight
![Spotlight](./spotLightSmoothEdges.PNG)

##### Multiple different lights
![MultiLights](./multiLights.PNG)

##### Multiple point lights
![MultiPointLights](./multiplePointLights.PNG)

#### Physics
Testing the 'Bullet' real-time physics simulation engine
![Physics](./integratingPhysicsEngine.PNG)
![Physics2](./integratingPhysicsEngine2.PNG)

#### Terrain
Testing terrain generation with berlin noise

##### Something's not right
![Terrain](./terrainGenerating.PNG)
![Terrain2](./terrainGenerating2.PNG)
![Terrain3](./terrainGenerating3.PNG)


#### Refactoring
At this point the test code base structure was getting a bit out of hand and I decided to start designing a little bit how it would work better. I was thinking that the renderer would work as an 'engine' library, separately from the game or other use case. I also moved to a ECS ( Entity Component System ) based system, which optimizes the CPU cache for handling the data. I also started to think about how to abstract the graphics API so that Vulkan API could be added later on to the engine.

##### Some terrain and cubes from the new 'engine' library added to the scene
![ECS](./refactorECS.png)
