

## Description
Update for the 3D engine project.

Many of the features here in these examples look visually pretty boring, because
I don't have a functioning UI tool to adjust the parameters, which is needed to be done
a lot, currently I re-build the whole engine to test parameter changes.

Well I have ImGUI and could use that, but I decided that I would try to setup a custom 
UI solution for parameter tweaking at some point. Also there's only the engine repo
and I think the more fine tuned implementations should be created in some external
project. 


## Animations

Old animation system started to lag the application with only a few characters on the
screen, got about 30fps with ~5 characters.

Did some optimizations for the animation system here.

Here's 10 x 10 grid of animated characters, although some are frustum culled. Bone
 transformations and animation blending is calculated in the CPU. 
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/256ERyT.mp4" type="video/mp4">
  </video>
</dl>

Distance based animation LODs ( Level Of Detail )
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/CGeNMNR.mp4" type="video/mp4">
  </video>
</dl>

This is what the transition between animations look like without animation blending
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/ibf7Qf4.mp4" type="video/mp4">
  </video>
</dl>

## Post processing

##### Bloom effect
It's this glow effect on bright objects.

![Preview](https://i.imgur.com/1Nh65pS.png)

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/whouP5H.mp4" type="video/mp4">
  </video>
</dl>

Bloom effect is applied to everything with high enough RGB values, so for example the
debug visualizer shapes look pretty interesting
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/6jZtLeR.mp4" type="video/mp4">
  </video>
</dl>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/r9OooS8.mp4" type="video/mp4">
  </video>
</dl>


##### Volumetric fog

![Preview](https://i.imgur.com/I5Saor9.png)

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/PqUPCVY.mp4" type="video/mp4">
  </video>
</dl>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/Kq9j7Dn.mp4" type="video/mp4">
  </video>
</dl>

## Simple shader fog
This is probably the easiest to implement visual effect. It requires very little changes in
the application, the shader only needs 2 variables; fog density and color. And it's just
mixed to the final pixel color. 
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/AXaVfGe.mp4" type="video/mp4">
  </video>
</dl>

## Shadows
Shadow mapping currently enabled for the player only and other interactable objects in the
scene. So no terrain or foliage shadows.

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/z5q7UnW.mp4" type="video/mp4">
  </video>
</dl>

Shadow map in Renderdoc

![Preview](https://i.imgur.com/810JsW2.png)

## Terrain

Texture tiling. Grass mask is created in Blender and imported to the engine, which is
passed to the shader and the grass is tiled and blended to the ground texture, which
is also tiled.
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/MfMqPXN.mp4" type="video/mp4">
  </video>
</dl>

![Preview](https://i.imgur.com/9g3ZrAU.png)

##### Terrain props
Some trees placed in Blender. I'm currently using a python script in Blender to generate a
metadata .json file which contains all the position/rotation/scale/dimensions and
model file paths. The .json is then parsed in the engine and the 'props' are 
rendered with instanced draw calls.

It's a placeholder system, since it's pretty clunky to use and can't see how the terrain
looks until everything is exported and imported in the engine.

Probably looking into possibly creating some Blender plugin to automate this or something
else if it's not feasible/possible.

The tree instances total to around 5million triangles. Without LOD system or frustum
 culling + calculating lights and rendering all other 'props' at the same time for the
 whole map, really start to affect the FPS.

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/naPZrqt.mp4" type="video/mp4">
  </video>
</dl>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/SATvPID.mp4" type="video/mp4">
  </video>
</dl>

Very scientific measurements happening here

![Preview](https://i.imgur.com/fPpcs7n.png)

Another terrain prop type
![Preview](https://i.imgur.com/qBxjPqA.png)

##### Grass
Instanced grass. It's rendered automatically to the terrain based on a grass mask
texture. So areas with grass texture gets these grass meshes.

Grass is currently rendered as 2 quads crossed, which is likely to change.

Here's a little over 100k triangles used for the grass. They are rendered for the whole map
and currently no LOD system or frustum/occlusion culling.

There's also a simple wind effect applied in the shader.

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/PuxKTO8.mp4" type="video/mp4">
  </video>
</dl>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/unjhhpS.mp4" type="video/mp4">
  </video>
</dl>

##### Water
Simple textured water with waves animated in the vertex shader. Also some
underwater effects which are rendered to a full screen quad in front of the camera.
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/Q6TDvl5.mp4" type="video/mp4">
  </video>
</dl>

## UI
Some UI tools written in Lua. These are still very much in a work in progress state
currently.

In-game Lua editor with the ability to edit the scripts and reload them. Also
a 'Run' button for directly executing Lua code from the editor. The lower part is
a console output view.

![Preview](https://i.imgur.com/IZyoHYk.png)

I've re-written it about 3 times and it has probably taken the most
time to implement out of the current engine features at this point.
And it's still not very usable. Instead, I use an external code editor and just 
click the 'Reload Scripts' button to reload the scripts.

Here's some early version of the console showcasing that the code is really executed 
in the application. The Execute button is missing a de-bouncer so the script is exectued 
multiple times. Also I think in this version the scripts were updated every frame, which
is currently limited to every 50ms.

![Preview](https://i.imgur.com/5H3gX1s.png)

A tool to show key bindings
![Preview](https://i.imgur.com/nj8TMnh.png)

Preliminary version of a settings tool
![Preview](https://i.imgur.com/oluu9f8.png)

A tool to visualize the UI coordinate system
![Preview](https://i.imgur.com/7th7SKw.png)

## Misc

##### CPU profiler
Visual Studio CPU profiler is very helpful in finding bottlenecks in the CPU side.

![Preview](https://i.imgur.com/WqZv99R.png)


##### Renderdoc API

There's also a Renderdoc API support. I can capture a frame with 'F9' key which then
loads the capture in RenderDoc application. Is helpful because without the API integration,
I would have to re-launch the executable in Renderdoc and try to re-create the scene that
I wanted to capture.

![Preview](https://i.imgur.com/0QkEFd0.png)

## Bugs compilation
Engine bugs and rendering issues:
<iframe width="1280" height="720" src="https://www.youtube.com/embed/6gu9eChPKyw" title="game engine bugs v0.2.0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Release notes v0.2.0
```bash
## [v0.2.0] - 2024-09-07

### Added
- Docs page for the project
  - Lua API docs
  - Docs page is a static page created using mkdocs
- Animation system:
  - Animation LODs
  - Toggle button to visualize animation LODs
  - Add animation control keybinds
- UI library:
  - Handle system for UI elements
  - New UI elements
    - Text
    - Text Input
    - Text Output
    - Line
    - Slider
    - Checkbox
    - Frame
    - Button
- Lua scripting support
  - UI library bindings
  - Hot reloading of Lua scripts
  - Lua stuff runs in it's own thread'
- Lua scripts:
  - Lua script editor
  - Player test script
    - Generates a adjustable grid of animated characters
  - Key bindings viewer
  - Preliminary settings viewer
  - UI coordinates visualizer 
- Lighting support ( Phong lighting model )
    - Directional lights
    - Point lights
    - Spotlights lights
- Renderdoc API integration
  - Frame capture with F9
  - Saves the frame to a file and opens it in Renderdoc
- Shadow mapping
  - Currently enabled only for the player character
  - Fade out shadows on sunset/sunrise
- Post processing effects:
  - Volumetric fog support
  - Bloom support
- Simple shader fog support
- Preliminary 'Weather' system
  - Handles wind and fog currently
- Add a separate frame timer class
- Terrain:
  - Embedded texture loading for terrain models
  - Terrain texture tiling
  - Terrain 'prop' placing based on a terrain metadata file, which is exported from Blender
  - Water support
    - Generates adjustable water plane mesh
    - Animates the water for a wave effect
    - Underwater effects:
      - Tint effect
      - Bubbles
    - Texture tiling
  - Grass support ( instanced )
    - Grass wind effect
- Skybox with static textures
- Player character jumping support
- Versioning script to automate release process
- CHANGELOG.md file to track changes
- New dependencies:
  - nlohmann-json
  - Lua
  - LuaBridge
  - renderdoc

### Changed
- Improved the light manager system to handle multiple lights better 
- De-bouncers for collider debug view and UI toggles
- Animation system:
  - Change animation shader to get bone transformations from a UBO
  - Performance optimizations:
    - Optimize bone lookup
    - Skip bone transformation calculation if charater is out of camera view frustum
    - Optimize animation blending
- Move everything to 'engine' namespace
- Move headers to one common engine header
- Improve mouse release event.
- CPU optimizations
  - Mostly improving string operations in render loops
  - Also skip re-calculating various model matrices if the transform hasn't changed'
  - Optimize texture uniform names when drawing a model with only a few textures
- Memory optimizations
  - Avoid creating copies of model matrices
```