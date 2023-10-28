

##### Install WSL to Non system drive ( not C:\ )
````powershell
- Win button -> Search for 'powershell' -> Ctrl + Shift + Enter
- cd G:\
- mkdir WSL
- cd WSL
- See distros here: https://docs.microsoft.com/en-us/windows/wsl/install-manual
- iwr -Uri https://aka.ms/wsl-ubuntu-1804 -OutFile Ubuntu.appx -UseBasicParsing
- move .\Ubuntu.appx .\Ubuntu.zip
- Expand-Archive .\Ubuntu.zip
- cd Ubuntu
- .\ubuntu1804.exe
- Create username and password
````

##### Resize WSL virtual drive
````powershell
1. Increase virtual disk space
- Win button - Search for "Turn Windows features on or off" -> Hyper-V -> Tick on
- Win button -> Search for 'powershell' -> Ctrl + Shift + Enter
- cd to the location of virtual drive ( ext4.vhdx )
- resize-vhd -Path .\ext4.vhdx -SizeBytes 326GB
- Another way: https://docs.microsoft.com/en-us/windows/wsl/compare-versions#expanding-the-size-of-your-wsl-2-virtual-hard-disk
2. Increase physical disk space on linux
# This can cause error: "/dev: none already mounted on /dev.". just ignore.
- sudo mount -t devtmpfs none /dev
# Check output e.g. /dev/sdb
- mount | grep ext4
# Give the size in megabytes
- sudo resize2fs /dev/sdb 376000M
````

##### WSL root filesystem on Windows
````powershell
\\wsl.localhost\Ubuntu-20.04
````

##### Windows root on WSL
````bash
/mnt/c
````

##### View current WSL virtual drive size
````powershell
- Win button -> Search for 'powershell' -> Ctrl + Shift + Enter
- diskpart
- Select vdisk file="G:\Ubuntu-20-04_wsl\ubuntu-1804\ext4.vhdx"
- detail vdisk
````