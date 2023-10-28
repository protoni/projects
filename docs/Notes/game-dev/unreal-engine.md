

##### Console
````bash
# Setup editor console
Edit -> Editor settings -> Keyboard Shortcuts -> search for 'console'
-> Set keybind for 'Open console command box' ( for example '§' )

# Setup in game console
Edit -> Project settings -> Input -> Console -> Set Console key ( for example 'ยง' )

# Console settings
Edit -> Project settings -> Console

## Console commands:
# Set fps to max 60
t.maxFPS 60

# Show fps
stat FPS

# Show triangle count
stat RHI

# Displays the amount of time in milliseconds used by the GPU for different processes. 
Stat GPU
````

##### C++
````bash
# UPROPERTY
- Step 1: Determine blueprint accessibility
  - BlueprintReadWrite: Blueprints can read and write the variable
  - BlueprintReadOnly: Blueprints can only read the variable
  - <nothing>: Can be left empty, new variables should always have at least empty UPROPERTY

- Step 2: Determine editor accessibility
  - EditAnywhere
  - EditInstanceOnly
  - EditDefaultsOnly
  - VisibleAnywhere
  - VisibleInstanceOnly
  - VisibleDefaultsOnly
  - <nothing>
  
- Step 3: Determine category
  - Add Category = "_name_here_"-parameter

- Step 4:
  - Meta = (AllowPrivateAccess = "true"): fix compiler error saying that "VisibleAnywhere" can't be a private variable

# UFUNCTION
- Step 1: Determine blueprint accessibility
  - BlueprintCallable: Use for non const functions
  - BlueprintPure: Use for const functions
  - <nothing>: Can be left empty, new functions should always have at least empty UFUNCTION

- Step 2: Determine implementation location
  - BlueprintImplementableEvent: Can have function body only in blueprints
  - BlueprintNativeEvent: Can have function body both in blueprints and c++

- Step 3: Determine category
  - Add Category = "_name_here_"-parameter


# Note! If C++ -> Blueprint functions act weird; restart UE4 and re-parent the object by opening the blueprint, change parent in details panel to the main parent and then back to base parent

# When creating a new project, start with a blueprint project. Can be changed
later to C++ project.

````

##### World partitioning/streaming
````bash
# Setup world streaming
1. World settings -> World -> Enable World Composition
2. Window -> Levels -> Levels drop down -> Create new -> Empty level -> Save -> Select and mmake current
3. Models landscape -> Adjust SectionSize / Sections Per Component / Number of Components -> Create
4. In Levels view, click the "Summons world composition" button
5. Move the level square next to the axis lines
6. Right click the level -> Add adjacent Landscape level -> X/Y locations -> Save
7. ( Optional if streaming distance needs to be adjusted ) In world composition tool; 
click the '+' button -> Give a new name and adjust the streaming distance
````

##### Editor
````bash
# Open GPU Visualizer
Press Ctrl + Shift + ,

# Find items on the 3d view ( for example the player. )
Modes -> Select -> Player start -> Press F key

# Move object
Click object -> Press W

# Rotate object
Clock object -> Press E

# Scale object
Click object -> Press R

# Hide lines and stuff in the 3d viewer
Press G

# Snap object to ground
Click object -> Press End

# Material editor freezes the editor
- Uninstall incredibuild

# Opening a project gets stuck at 39%
- Just wait, it might take a while.
````

##### Camera
````bash
# Fix camera not moving up/down
Open Character blueprint ( or camera BP if separate)
In 'details' panel search for 'Use Pawn Control Rotation'
Check that box

# Move faster in freelook mode
Hold Right mouse button down and scroll up to speed up, scroll down to slow down, while moving with arrow keys

# Disable lens flare
- PostProcessVolume -> Post Process Volume Settings -> enable 'unbound'
- PostProcessVolume -> Lens flare -> Intensity 0
````

##### Character movement
````bash
# Make character move with keyboard keys and animate
( Source: https://www.youtube.com/watch?v=DimZmTd5H44 )
- File -> New C++ Class -> Create 'MainCharacterBase.cpp'
- Create new blueprint to the project -> Right click content browser -> Blueprint class ->
Search for MainCharacterBase
- Name the blueprint as MainCharacter_BP
- Edit MainCharacter_BP -> Vuewport -> Select Mesh -> Add Skeletal mesh
- Add component -> Camera -> Rename to Main_Camera
- Adjust CapsuleComponent and Camera


# Setup movement keys:
Edit -> Project Settings -> Engine -> Input -> Bindings

Action Mappings:
- Jump
  - Space Bar
  
Axis Mappings:
- Forward_Backward
  - W: Scale 1
  - S: Scale -1
  
- Left_Right:
  - A: Scale -1
  - D: Scale 1
  
- Rotate_Left_Right:
  - Mouse X: Scale 1

- Look_Up_Down
  - Mouse Y: Scale -1

- Edit 'MainCharacter_BP' -> Event Graph:
InputAxis Forward_Backward -> Add Movement Input
InputAxis Forward_Backward ( Axis value ) -> Add Movement Input ( Scale value)
Get Control Rotation -> Get Forward Vector -> Add movement Input ( World Direction )

InputAxis Left_Right -> Add Movement Input
InputAxis InputAxis ( Axis value ) -> Add Movement Input ( Scale value)
Get Control Rotation -> Get Right Vector -> Add movement Input ( World Direction )

InputAxis Rotate_Left_Right -> Add Controller Yaw Input
InputAxis Rotate_Left_Right ( Axis value ) -> Add Controller Yaw Input ( Val )

InputAxis Look_Up_Down -> Add Controller Pitch Input
InputAxis Look_Up_Down ( Axis value ) -> Add Controller Pitch Input ( Val )

InputAction Jump ( Pressed ) - > Jump ( function )
````

##### Animations
````bash
# Setup animation
- In content browser go to the Character mesh folder -> Right click -> Animation -> Animation blueprint
- Select Target Skeleton -> Ok
- Right click content browser in mesh folder -> Animation -> Blend 1D -> Select skeletal mesh ->
Name to for example 'Shaman_Walk_Idle' -> Open it
- From the bottom right corner in Asset browser, drag idle animation to the bottom middle view, to the
left most section, then drag walk animation to middle dot and run animation to the dot on the right
- Drag green dot to see the animation blend
- On the left 'Asset Details' -> Horizontal -> Add Name: Speed --> Maximum Axis Value -> 375
- Edit 'Shaman_Animaton_BP' -> Drag 'haman_Walk_Idle' animation to the node editor and connect it to 'Output Pose' -> Save
- Create new variable 'Speed' ( float) -> Drag speed variable to the node editor and connect it to 'Shaman_Walk_Idle' ( Speed )
- Edit 'Shaman_Animation_BP' -> Event Graph:

Event Blueprint Update Animation -> 'Is Valid' ( Is Valid ) -> Set Speed
Try Get Pawn Owner -> 'Is Valid' ( Input Object)
Try Get Pawn Owner -> 'Get Velocity' -> VectorLength -> Set Speed ( Speed )

- Edit 'MainCharacter_BP' -> Mesh -> Details ( Animation ) -> Anim Class -> 'Shaman_Animation_BP'
````

##### Textures
````bash
# How to scale a texture
- Open material
- Right click next to Texture Sample that is needed to be scaled up/down
- Search for TextureCoordinates -> select that node
- Drag TextureCoordinates node to Texture Sample UVs section
- Change UTiling and VTiling on the left details panel

# How to scale a material texture dynamically
# Note: This has a drawback with animated/moving objects; in cases where the 
#  object moves, it looks like the texture is 'swimming' on the surface, 
#  because it's fixed to the world location and object is moving.
#  So in a nutshell; use only on static objects.
- Open material
- Right click next to Texture Sample that is needed to be scaled up/down
- Search for 'World Aligned Texture' -> select that node
- Right click texture and select 'Convert to texture object'
- Drag Texture object's node to 'World Aligned Texture's' 'TextureObject (T2d)' section
- Drag 'World Aligned Texture's' 'XYZ Texture' output to Material's 'Base Color'
- Repeat these same steps for Normal maps, Ambient maps, Roughness map's etc. Except change 'World Aligned Texture' to:
  - 'World Aligned Normal'
- Create new node 'VectorParameter' -> Edit its configs and set texture RGB values to change scaling
- Connect VectorParameter output to WorldAlignedTexture/Normal 'TextureSize(V3)' input
````


##### Mesh
````powershell
# Change ThirdPersonCharacter mesh
https://www.youtube.com/watch?v=MzHw2y7vhLY
https://www.youtube.com/watch?v=I-K4_ENh1Hs
https://www.youtube.com/watch?v=0MFx1B0QpoM
````

##### Environment
````powershell
# Paint grass
( Source: https://www.youtube.com/watch?v=CkAlenO9q1Q )
- Go to for example /Game/Environment folder
- Right click content browser -> Create Material -> Open it
- Search for 'landscape' in details panel -> Drag 'LandscapeGrassOutput', 'LandscapeLayerBlend and
'LandscapeLayerSample' to the editor view.
- Click 'Layer Blend' and set 'Layer Name' to 'Grass' in the left details panel and 'Preview..' -> 1
- Select 'Sample None' -> set parameter name 'Grass'
- Drag landscape 'ground base' texture from content browser to the editor view
- Connect texture sample to 'Layer Blend' and then to main 'Grass' object 'Base Color'
- Connect 'Sample Grass' -> Grass node
- Right click content browser -> Foliage -> Landscape Grass Type -> Open it
- Add array -> Assign Grass Mesh -> Set Grass Density -> Save
- Open Grass material -> Click the small Grass node -> Set 'Grass type' parameter on the left
- Click 'Apply'
- World outliner -> Select landscape object -> Modes -> Landscape -> Paint -> Select landscape object
again in the world outliner 
- On the left, select assign the Grass material to Target Layers -> Save
- Paint tool -> Select target layers material -> Paint to screen

-- To add more different types of grass, edit 'Grass1' Landscape type -> Add array -> Assign another
material and set density

# Remove gloss from ground on material, for example ground
( Source: https://www.youtube.com/watch?v=oeD2xnlCUTY )
- Open the material that needs to have glossiness removed
- Drag away from 'Specular' section of the material
- Search for 'Constant'
- Leave value at 0
- Save and apply

# Place trees
- Modes -> Foliage -> Drag some plant and tree meshes on the left
- Adjust Size and density, for example 0.001 density for trees and 500 size
- Start painting trees to the view

# Add foliage collision
Open foliage tool
Add some mesh
Click the mesh open and down in the settings set collision to for example 'blockAll'
Save mesh ( the disk icon in the top right corner of the mesh in foliage tool )
Start painting
````

##### LOD
````powershell
# Setup smooth transition between LODs
First modify the base material ( for example M_Bark ), search for dithered lod, enable "Dithered LOD1"
Then open the object material ( for example MI_Bark ) -> Search for 'dithered LODTransition' -> Tick both boxes
````