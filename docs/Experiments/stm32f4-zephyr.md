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

# Download and install STM32CubeProgrammer
https://www.st.com/en/development-tools/stm32cubeprog.html

# Flash the device. Connect USB to the board
west flash --runner stm32cubeprogrammer
```

LED blinking
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/4sMoz2o.mp4" type="video/mp4">
  </video>
</dl>

## Docs
See the full getting started guide:

<https://docs.zephyrproject.org/latest/develop/getting_started/index.html>

STM32F429I-DISCO specific Zephyr page

<https://docs.zephyrproject.org/latest/boards/st/stm32f429i_disc1/doc/index.html>

STM32F429I-DISCO overview, pinout etc.

<https://os.mbed.com/platforms/ST-Discovery-F429ZI/>

Zephyr demos

<https://docs.zephyrproject.org/latest/samples/index.html#samples-and-demos>

