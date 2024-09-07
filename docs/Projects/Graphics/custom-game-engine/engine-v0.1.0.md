---
title: Custom Game Engine
date: "2024-08-10T16:48:37.121Z"
description: "Custom Game Engine"
tags: ["graphics"]
---

## Description
Custom 3D game engine project in C++/Opengl. Here's some videos and pictures
 of the progress so far ( about 2 weeks ).

I've been trying to work on OpenGL renderers in the past, but eventually quit due to the amount of time
it takes to get basic things working. 
( <https://protoni.fi/Projects/Graphics/custom-graphics-renderer/> & <https://github.com/protoni/feldewar> 
+ other stuff in private repos )

Decided to try again in the today's AI era. It has been a huge help here ( Claude 3.5 Sonnet + ChatGPT 4o ), 
without them, I could've implemented only fraction of the features in the same amount of time. Probably about 80% of the
code is currently AI generated, I just copy-paste and glue stuff together. And I've been moving very fast with the project so
I've neglected a lot of the required refactoring.

So far only 3 different features were just too complicated for the AI to help with pretty much at all; the character animation
blending, meaning that when the switching to different animation, it wouldn't instantly snap into different position where
the animation starts, but interpolate the bone transformations for smoothly transitioning between animations. So instead of
copy-pasting from an AI response, I naturally copy-pasted from LearnOpenGL ( <https://learnopengl.com/Guest-Articles/2020/Skeletal-Animation> )

Other thing too difficult for the AI was mouse picking feature with a render-to-text method. I have to come back to 
this one as I've only implemented the sphere / mouse ray intersection based picking in the current version. In one of the videos,
there's the huge green bounding sphere around the player character that's manually scaled so it's kinda clunky. With the render-to-text,
there could be pixel perfect detection if the mouse clicked the object.

Third thing too difficult was the terrain chunk auto loading/unloading. There's currently support for splitting the terrain into
chunks and then just based on the distance between the camera/player, not draw the chunks that are too far. But I'm not sure how useful
this is since OpenGL already has a built in 'render distance' thing. 
One other thing related to terrain that was difficult to create was to embed objects ( for example buildings )in the terrain mesh. Well,
that was actually easy, but trying to handle the collisions is just painful. That caused all kinds of weird issues and I'm currently 
thinking of creating a some kind of world editor thing that loads the terrain plane mesh and then in the editor the objects
could be manually placed in. And it should somehow load/save the positions to some file.

There's a script in the repository's root to count the lines of code/files. Alot of the code is in the headers and should be moved to .cpp files,
so it counts them as well here. Also there's quite a lot of shader code that's not counted here.

```bash
PS D:\projects\opengl-model> .\count_lines.bat
Counting src/ files:
Source files: 63
Source lines: 6959

Counting include/ files:
Header files: 82
Header lines: 4646

Total files: 145
Total lines: 11605
```

## Showcase

##### Video clips
<iframe width="1024" height="480" src="https://www.youtube.com/embed/XNuLh4e5RcE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


##### Slide show
<iframe width="1024" height="480" src="https://www.youtube.com/embed/T_r9BSyQEtk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Features
- Lighting support
    - Directional lights
    - Point lights
    - Spotlights lights
- Skybox
    - Brightness adjustment for day/night cycle
- Day/Night cycle handler
- 3D model loading
- Model animations and animation blending
- Animation system running in it's own thread
- 'Engine Core' singleton to handle core features
- Scenes with selectable 'SceneObject' types
    - Highlight animated 3d models
    - Highlight 3d models/basic shapes.
- Basic 2D/3D shape factory
- Particle system
- Load and play sounds
- Load textures
- Load shaders
- Asset manager to load different assets
- Game UI library
    - Inventory UI system with drag-n-drop feature to sort items/throw out of inventory
    - Player stats view
    - Health bar
    - Action bar system
        - Key mapping
- Frustum culling for characters
- Game inventory
    - Separate inventory system that uses the UI library as front-end
- Mouse and keyboard handling through 'input observers'
- 'Character' types
    - Main 'Player' character
    - Character jumping
    - 'NPC' type for other characters
- ImGUI debug UI setup
- On screen debug UI setup
- Text rendering
- Terrain loading/chunking.
    - Loads a sculpted 2d plane
    - Distance based rendering for each world chunk.
    - Collision handling with the player character
- Camera and CameraController system
    - 2 Cameras, one following and rotating over the character
    - Free-look debug camera
- Debug drawing
    - Draw terrain colliders, player bounding spheres, collision shapes.
    - Draw collision point with the terrain
- Grid class for drawing debug grid
- Frame rendering/updating details
- On-screen version info
- One-click version tagging/releasing script
