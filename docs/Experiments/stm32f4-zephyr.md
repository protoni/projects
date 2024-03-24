# STM32f4 Zephyr

## Description
Test setting up a Zephyr project for STM32F429I-DISCO dev board

## Setup Windows dev env

### Create a new virtual environment
```powershell
# Setup python virtual env
cd $HOME
python -m venv zephyrproject\.venv
.venv\Scripts\activate
```

### Install west and Zephyr dependencies
```powershell
# Install west
pip install west

# Get Zephyr sources
west init zephyrproject
cd zephyrproject
west update

# Setup Zephyr requirements
west zephyr-export
pip install -r $HOME\zephyrproject\zephyr\scripts\requirements.txt
```


### Install Zephyr
```powershell

# It is recommended to extract the Zephyr SDK bundle to home dir
cd $HOME

# Disable progress bar, which slows down the download for some reason
$ProgressPreference = 'SilentlyContinue'

# Download zephyr SDK bundle
Invoke-WebRequest -Uri "https://github.com/zephyrproject-rtos/sdk-ng/releases/download/v0.16.5-1/zephyr-sdk-0.16.5-1_windows-x86_64.7z" -OutFile "zephyr-sdk-0.16.5-1_windows-x86_64.7z"

# Extract SDK
7z x zephyr-sdk-0.16.5-1_windows-x86_64.7z

# Setup SDK
cd zephyr-sdk-0.16.5-1
.\setup.cmd

```

## Build example project
```powershell
# Activate dev env
cd zephyrproject
.venv\Scripts\activate
cd zephyr

# Build blinky example
west build -p always -b stm32f429i_disc1 .\samples\basic\blinky\
```

## Flashing
```powershell
# Install On-Chip Debugger
choco install openocd

# OR download and install STM32CubeProgrammer
https://www.st.com/en/development-tools/stm32cubeprog.html

# Flash the device using openocd. Note that RESET button must be briefly
# held down once the following command is given and immediately released,
# when the program executes
west flash

# OR flash the device using stm32cubeprogrammer
west flash --runner stm32cubeprogrammer
```

## Debugging
```powershell
# To debug using GDB. 
# Note: stm32cubeprogrammer doesn't seem to support debugging
west debug

# Example debugging blinky
(gdb) break main.c:38
(gdb) continue
 -> LED goes on
(gdb) continue
 -> LED goes off
...

```

LED blinking
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/4sMoz2o.mp4" type="video/mp4">
  </video>
</dl>

Serial port
```powershell
# This is also outputted to the serial port
LED state: ON
LED state: OFF
LED state: ON
LED state: OFF

putty.exe -> Serial -> COM3 -> 115200 baud
```

## Notes
```powershell

# List module metadata
west list
west list --format "{name} {path} {revision}" net-tools

# Erase disk when flashing the app
west flash --erase

# Open kernel config GUI tool
west build --target guiconfig

# Connect to running debugger without flashing
west attach

# Start GDB server and open a socket for external debuggers
west debugserver

```

## Shell
```powershell

# Build and flash shell
west build -p always -b stm32f429i_disc1 .\samples\subsys\shell\shell_module\
west flash

# putty.exe -> Serial -> COM3 -> 115200 baud
uart:~$ help

# Also tried to get samples/subsys/shell/fs working but having difficulties with
# the storage:
error: 'DT_N_NODELABEL_storage_partition_PARTITION_ID' undeclared here

# Tried adding to dts\arm\st\f4\stm32f429.dtsi:
storage_partition: partition@8000000 {
    label = "storage";
    reg = <0x08000000 0x200000>;
    read-only;
};

# It does seem to do something but doesn't fix the issue. Instead giving a new error:
error: 'DT_N_S_soc_S_partition_8000000_PARTITION_ID' undeclared here (not in a function); did
you mean 'DT_N_S_soc_S_partition_8000000_PARENT'?
```

SOC flash map
![Doc writer](https://i.imgur.com/13heLf8.png)

## Docs
See the full getting started guide:

<https://docs.zephyrproject.org/latest/develop/getting_started/index.html>

STM32F429I-DISCO specific Zephyr page

<https://docs.zephyrproject.org/latest/boards/st/stm32f429i_disc1/doc/index.html>

STM32F429I-DISCO overview, pinout etc.

<https://os.mbed.com/platforms/ST-Discovery-F429ZI/>

STM32F429I-DISCO datasheet

<https://www.farnell.com/datasheets/2309234.pdf>

STM32F429ZIT6 datasheet

<https://www.st.com/content/ccc/resource/technical/document/datasheet/03/b4/b2/36/4c/72/49/29/DM00071990.pdf/files/DM00071990.pdf/jcr:content/translations/en.DM00071990.pdf>

Zephyr demos

<https://docs.zephyrproject.org/latest/samples/index.html#samples-and-demos>

