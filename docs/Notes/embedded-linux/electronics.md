

##### EAGLE notes
````bash
#### Control panel ####

# Take custom librarys into use
Create custom_libraries folder under EAGLE projects dir and add .lbr file under it, for example:
OSD3358_BAS_RefDesignParts.lbr
Also in the control panel click the gray dot next to the library name, it should change to green


#### General board layout notes ####
# Routing high speed traces
For example USB data lines should be the same length, or max. 1% difference in trace lengths. Measure the trace
lengths and if the other one is too short, a length matching bends can be created to the end of the trace. Width
betweend the bend should be greater than 3x the trace width and the angles should be at least 135 degrees.


#### Schematic view ####

# Create bill of material
Select schematic view -> ULP -> bom.ulp Bill Of Material -> Save...

# Things to check before sending gerber files to manufacturer
- Run ERC check ( Electrical Rule Check )
- Make sure the components are available
- Check that every label connects to the right place
- Check that components have values.
- Add comments and circuit names


#### Board layout ####

# Creating Gerber files
Layout view -> File -> CAM Processor -> Load Job File (next to save disk-image) -> Local CAM Jobs -> examples
-> Third Party -> OSH Park -> OSH Park 4 layer -> Check that everything is OK -> Process Job -> Save

# Force routing through pins
Select route airwave tool and select 'Ignore obstacles' from the top toolbar

# Measure trace lengths. ( Other information also available here, for example max current based on trace length )
Paste this command in the command line:
run length-freq-ri

# Skip thermal gaps when doing copper pour
Select 'Thermals off' from the polygon menu in the top toolbar after selecting polygon tool. This needs to be selected
before doing the polygon.

# Create board borders ( dimensions ).
Ensure that the board starts from the white dottex cross mark on the view.
Click dimensions tool and go through the edges of the board. Make sure that outside of the board is gray colored and
the board itself is black. Check from Manufacturing previw windows that the board layout is ok.

# Create ground and power planes ( layers )
Ensure that there is enough layers to do this. With bottom and top signal layers already used, more layers is needed.
Then create a copper pour over the whole board

# Add more layers
DRC -> Layers -> dropdown 2 - 16 layers.

# Connect via's to specific layer
Right click via and set the name. For examle to place via's to ground set the name to GND, or to power source, change the name
to for example SYS_3V3

# Add copper pours
Click polygon in the toolbar and create a full loop with it to create the borders of the pour, then click ratsnest to pour the copper.

# Remove golden circle around via when previewing
DRC -> Masks -> Limit. Set to for example 25mil.

# Switch layers while routing
Click Scroll wheel and select another layer to continue on another layer, this will place a via.

# Check for board layout errors
DRC -> check

# Good font size for component value on silkscreen:
32 with 8% ratio

# Things to check before sending gerber files to board manufacturer
- All the component designators are placed appropriately next to their corresponding components.
- Pin 1 is marked for necessary components. This includes all ICs, connectors and polarized capacitors.
- There is no silkscreen over any component pads. This can lead to bad solder joints.
- The font size of the component designators is as large as possible given the space constraints of the board so that the text is readable.
- Try to not place silkscreen over vias. Silkscreen has a hard time adhering to the annular ring of a via which can make the text difficult to read.
````

##### How does current pass thru a capacitor?
````bash
- Normally it does not, only when voltages change rapidly, which means a change
in the electric field.
- There are two types of current. Current flowing in a conductor and "conduction current"
as well as "change in electric field"-current.
````

##### Cross talk
````bash
# How to reduce cross talk on a PCB?
- Move tracks further away from each other.
- Have a current return path ( GND ) closer to the track that cross talks.
For example on a 4 layer PCB, have a GND layer right under signal layer.

# Cross talk happens only on a rising/falling edge in the signal. Basically a change
in voltage will create a electric field and it will couple in to the other trace
that is too close.
- There is no cross talk anywhere else than near the falling/rising signal edge.
Other than what happens on the receiving end of the cross talk, which spreads that
voltage pulse in both ways.

# When cross talke happens. The other trace which is affected by the cross talk, will
have a voltage pulse, that will move in both directions.
- https://www.youtube.com/watch?v=EF7SxgcDfCo
````

##### Selecting the right IC
````bash
- Brand
  - Buy parts from manufacturers that are likely to be around a while ( NXP, TI etc.. )
- Length of the component life
  - Make sure availability is OK for the next few years.
- Industry
  - Temperature range
- Documentation
  - Make sure that the part has good documentation available
  - Schematics and design guides.
  - Checklist is a plus.
- Support
  - Check if there is a good community support
  - Check if reference designs are available
  - Check if there is generally some information available on the internet.
- Reference boards
  - Reference designs make the development process alot easier
- Performance
- Software
  - Make sure drivers are available or at least some example code.
````

##### Transmission Line Rules of Thumb
````bash
http://www.hottconsultants.com/techtips/rulesofthumb.html

# How to count 50 ohm track ( width of the track )
Multiply height of the dielectric field by 2
Example:
5mil delectric * 2 = 10mil track to get 50ohms
````

##### Kicad
````bash
# "0 items loaded" when trying to Choose Symbol
- Main Kicad window -> Preferences -> Manage Symbol Libraries ->
Global Libraries -> Add libraries here. They are located in Kicad install dir:
C:\Program Files\KiCad\share\kicad\library
Select them all with Ctrl + A.

# Move components
- Hover on a component with a mouse cursor and press M.
- To rotate, hover a component and press R.
- To copy, hover a component and press C.
- To drag lines press G.

# Name components
- Click "annotate schematic symbols" from the toolbar in top right side. ( pen and paper )
- It's best to do this once the schematic is done.

# Assign values to components
- Hover over a component and press E.
- Set value to "text" field.

# Create new sheet
- Create hierarchial sheet by pressing S.
- Enter to newly created sheet by right clicking and selecting "Enter sheet"
- Leave the newly created sheet by right clicking and selecting "Leave sheet"
- To create a local label:
-- Place -> Place hierarchial label
- To Reference local label from root sheet:
-- Place -> Import Hierarchial label

# Draw lines
- Press W
````

##### STM32cube IDE
````bash
# Error downloading the following files: (target directory already exists)
- Go to C:\Users\USER_NAME_HERE\STM32Cube\Repository
- Extract stm32cube_fw_f1_v183.zip to the same folder
- STM32CubeIDE -> Project -> Generate code
````

##### How to design boards that work the first time
````bash
1. Import reference schematics
- Ask orCAD or Altium schematics from chip manufacturers
- Saves time
- Reassures you that connections are correct

2. Use the same pinout / connections as in the reference circuit
- Faster software development
- Can use reference software/firmware
- Circuit works already

3. Build simple test circuits
- Create 1 layer test PCB for untested circuits

4. Add bypass resistors, pull ups & downs, optional components etc.. into your schematic
- If you are not sure a net is 100% going to work, add for example 0% resistor
- If not sure if you need a pull-up or pull-down resistor, add a traces for both and
then leave other one empty
- Add bypass 0 ohm resistor for circuits you are not sure if they work
- For EMI testing, add footprints around the board, can be populated with resistors or
capacitors based on testing results

5. Check, double check and triple check your libraries
- When creating a footprint
-- You can be sure that it has the correct footprint
- Double check pinouts on the parts

6. Go through schematic check and layout check documents

7. Take time to browse and check your schematic
- Take 2 weeks checking schematics, footprints and pinouts
- Altium Navigator is a good tool for this

8. Once placement is ready, build a paper model
- Print out the PCB on a cardboard
- Place all of the components to the paper before manufacturing the boards
- Place all the connector wires, USB sticks to USB connectors etc.. to make sure that
they fit in place also

9. Reuse reference layout

10. Read and follow design guides
- Use manufacturer's design guide for the chip, if such a thing is available

11. If, during layout, you have to break important rules, simulate

12. Imagine what will happen when you connect your board to power.
Imagine what you are going to do when you receive your first prototype

# Link
https://www.youtube.com/watch?v=h5SazzziazM
````

