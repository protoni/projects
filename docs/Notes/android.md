

##### Setup android development environment
````bash
# Setting up android development environment

# Download the installer from the official site and install
https://developer.android.com/studio/

# Create new project
File -> New -> New Project

# Configure the project
- Add name
- Select Java from the Language drop-down menu

# Setup phone
- Connect USB cable to the phone
- Enable developer mode
-- Settings -> System -> About phone -> Tap Build number 7 times
- Enable USB debugging
-- Settings -> System -> Developer options -> USB debugging

# Run hello world on the phone
- Run -> Select device -> YOUR_PHONE
- If the phone is not showing up:
-- Re-attach cable to the phone and make sure to enable USB debugging
-- Run -> Select device -> Open AVD manager -> Rescan
-- Click Run

````