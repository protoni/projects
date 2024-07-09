
## Cursor and origin dot
````powershell
# Move 3d cursor to the center
Shift + C

# Move Object origin to the 3d cursor
Top Left -> Object button -> Set origin -> Origin to 3d cursor
````

## Scaling
````powershell
# Scale
Press 'S'

# Scale inwards/outwards only
Perss 'Alt' + 'S'

# Scale skin modifier vertices
Press'Alt' + 'A'
````

## Extruding
````powershell
# Extrude to cursor and keep the alignment
- Press numpad 1 to view from the from side
- Move cursor to the desired position
- Ctrl + mouse right click

# Extrude multiple faces at once
Edit mode -> face mode -> Select multiple faces ( hold shift )
Alt + e -> Extrude individual faces
````

## Selecting
````powershell
# Select whole parts individual from an object ( For example only leaves on a tree object )
Hover over the object part -> Press 'L'

# De-select
Hover over the object part -> Shift + L

# Select everything around the object ( For example every side of a square ) ( Loop select )
Hover over the object -> Alt + left click

# Select everything around the object to the other direction
Hover over the object near a edge -> Alt + left click

# Select faces by 'painting' over them
Hover over some faces -> Press 'C' -> Click mouse left-> paint over other faces

# De-select faces by 'painting' over them
Hover over some faces -> Press mouse wheel -> paint over other faces

# Ring select ( select all of the edges around an object)
Alt -> Ctrl -> left click an edge

# Loop select ( select all edges up and downwards that are connected )
Alt -> Left click an edge

# Select the shortest path to another edge
Edge mode -> Click an edge -> Hold Ctrl and click another edge somewhere else

# Lasso select
Ctrl + mouse right

# Select more nearby faces with a button press
Select a face -> Ctrl and + sign to grow selection, - to decrease selection ( numpad )

# Select random
Go to face mode for example -> Ob the top click 'Select' button -> select random

# Select similar
Click a face -> Shift + G

# Select faces pointing to the same direction ( good for example to add snow on top of things)
Click a face -> Shift + G -> Normal -> ( increase threshold at the bottom popup )

# Select every other face
Face mode -> hover over an object and press L to select all -> F3 -> search for 'checker deselect' -> press enter

# Knife select
Press 'K' -> Knife out a shape and press enter
````

## Misc
````powershell
# Duplicate an object
Press 'Shift' + 'D' for normal copy
Press 'Alt' + 'D' for linked copy ( future edits are copied over as well )
To unlink, select the object in object mode, Press 'Object' tab on the top right
-> Relations -> Make single user -> Object & Data

# Toggle X-ray
Alt + Z

# Hide an object
Press 'H'

# Unhide an object
Alt + H

# Set individual origin
Press '.' (dot) -> individual origin

# Snap to center of a face
Hold down Ctrl

# Create a low poly rock
Subdivide ( Ctrl + 3 for example ) -> Edit mode -> Press 'O' -> vertex mode -> Move vertices around -> Object mode -> Add decimate modifier -> Lower ratio

# Flatten faces
Edit -> Preferences -> Addons -> Search loop tools -> enable
Select multiple faces -> F3 -> Search for flatten

# Select between normal and global orientation
Press ',' ( comma )

# Fill holes
Select whole object with 'L' -> Press 'F'

# Add edges
Select 2 vertices -> Press 'J'

# Triangulate a face
Select a Face -> Ctrl + T

# Remove edges from a face
Select multiple faces -> Press 'X' -> Dissolve edges

# Bridge objects together
Select a face from each object -> F3 -> Bridge edge loops

# Separate loose parts in to their own objects
Edit mode -> hover over the object -> Press 'A' to select all -> Press 'P' -> By loose parts

# Enable auto mirroring
Object mode -> Edit -> Preferences -> Addons -> auto mirror -> enable
Press 'N' -> click AutoMirror in the popup top right

# Create land shape fast
Add plane -> Resize bigger -> Ctrl + 5 -> On the subdivide menu -> Press Simple -> Press Apply -> Go to edit mode to see the effects
To add more subdivides -> Object mode -> Ctrl + 2 -> On the subdivide menu -> Press Simple -> Press Apply -> Go to edit mode to see the effects
Press 'C' and select some faces -> Press 'O' to enable proportional editing -> Press 'S' to scale upwards

# Flip selection ( Select everything that is not currently selected )
Ctrl + I

# De-select eveything with a specific color on a color palette
In UV Editing window click douple arrow icon top right -> Press 'B' -> Shift box select the color that we want to de-select

````

## Problem fixing
````powershell
# Merge all vertices on object
Press 'A' to select all -> Press 'M' -> by distance

# Flip faces
Alt + N -> Flip

# Flip all faces on a object
Face mode -> Select all -> Alt + N -> Recalculate outside

# Mis-aligned vertices
Top middle tool bar -> snap options -> Vertex
click vertex -> move on desired axis -> Hold Ctrl -> point to a vertex that is in right alignment

# If scaling is messed up or inset is not uniformed ( to check press 'N' -> Item -> Scale: everything should be 1 )
Object mode -> Ctrl + A -> Scale

# Invert face orientation
Select object
Go to edit mode
Press 'Shift' + 'N'

# Check face orientation
Top right, 2 circles overlapping icon -> Face orientation
````

## Sculpting
````powershell
# Quickly switch between objects in sculpting mode
Untick Edit -> 'Lock objects mode'
To select another object; 'Alt' + 'Left click'

# Before sculpting
In layout view, object mode, select object
Press 'Ctrl' + 'A' -> Apply transformation/scale/rotation
````

## Edit mode
````powershell
# Merge all nearby vertices
Press 1 to go to vertex mode
Press 'm' -> merge by distance

# Move loopcuts along edges
Press 'G' twice, so gg

# Delete all edges
Select edge with 'Alt' + 'Mouse Left'
Press 'Ctrl' + 'X' to delete

# Bevel ( round up an object with edges )
Select All edges around the object
Press 'Ctrl' + 'B' and drag with mouse

# Control the border with with inset
Press 'B' while inseting
````

## Modifiers
````powershell
# Mirror objects using addon
( Optional ) Edit -> Preferences -> Search 'auto mirror' -> Enable
Select object -> Press 'N' -> Edit -> Select X axis and orientation: Positive.
If mirroring to 3 different selections. Add another mirror and select Y axis with Negative orientation.

# Mirror objects
Click object
Press wrench icon on the right -> Add modifier -> Search 'Mirror'
Use the picker tool to select the object which origin to use for the mirror

# Apply subdivision surface ( or any other modifier )
Select the subdivision modifier
Press 'Ctrl' + 'A'
````

## Debug
````powershell
# Show vertex / face count
Right click bottom toolbar -> tick 'Scene Statistics'
````

## Grouping objects

````powershell
# Separate parts of object
Select faces/parts
Press 'P'
Separate by selection

# Group objects together
Select all objects
Press 'Ctrl' + 'J'

# Group items together in tree view
Select all objects
Press 'M' -> New Collection
````
