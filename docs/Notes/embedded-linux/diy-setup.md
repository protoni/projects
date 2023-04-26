


# Toolchain

### Toolchain types ( gnueabi / gnueabihf )
````
- GNU Extended Application Binary Interface / --||-- hardware floating point support
Passes 
- gnueabi relies on software floating-point library
- gnueabihf uses floating point registers instead of integer registers
- in function calls, the hardware floating point support makes calling with float and double type parameters faster
````

### Build toolchain
````bash
git clone https://github.com/crosstool-ng/crosstool-ng.git
git checkout crosstool-ng-1.25.0
./bootstrap
./configure --prefix=${PWD}
make
make install
bin/ct-ng arm-cortex_a8-linux-gnueabi
bin/ct-ng build
````

### Toolchain usage
````bash
# Toolchain install location
~/x-tools/arm-cortex_a8-linux-gnueabi

### List default configurations
bin/ct-ng list-samples

### View default configuration
bin/ct-ng show-arm-cortex_a8-linux-gnueabi

# Disable read-only toolchain ( CT_PREFIX_DIR_RO )
# Enable hardware floating points ( CT_ARCH_FLOAT_HW )
# Target options -> Use specific FPU -> 'neon'
bin/ct-ng menuconfig

# Setup toolchain env
PATH=~/x-tools/arm-cortex_a8-linux-gnueabi/bin:$PATH
export CROSS_COMPILE=arm-cortex_a8-linux-gnueabi-
export ARCH=arm

# Get toolchain info
arm-cortex_a8-linux-gnueabi-gcc --version
arm-cortex_a8-linux-gnueabi-gcc -v

# Toolchain compiling
arm-cortex_a8-linux-gnueabi-gcc test.c -o test_bin

# Override toolchain compiler settings
arm-cortex_a8-linux-gnueabi-gcc -mcpu=cortex-a5 test.c -o test_bin

# Read linked libraries
arm-cortex_a8-linux-gnueabi-readelf -a test_bin | grep "Shared library"

# Get location of shared library runtime linker
arm-cortex_a8-linux-gnueabi-readelf -a test_bin | grep "program interpreter"

# Print toolchain sysroot
arm-cortex_a8-linux-gnueabi-gcc -print-sysroot
````

# Bootloader
### Boot process
````bash
1. ROM code
2. Secondary Program Loader ( SPL ) running in SRAM Initializes DRAM
3. SPL loads u-boot ( Tertiary Program Loader (TPL) ) in and jumps in there
4. Loads kernel into DRAM
5. Kernel loads root file system
6. Init program is executed with PID 1
````

### Build u-boot
````bash
git clone git://git.denx.de/u-boot.git
cd u-boot
git checkout v2021.01
PATH=~/x-tools/arm-cortex_a8-linux-gnueabi/bin:$PATH
export CROSS_COMPILE=arm-cortex_a8-linux-gnueabi-
export ARCH=arm
make am335x_evm_defconfig
make
````

### Flash u-boot to target device
````
format sdcard to have a 64MB boot section and a 1GB rootfs
copy MLO and u-boot.img to the /media/user/boot/ folder
umount the boot mount point
````

### Boot linux image
````bash
fatload mmc 0:1 0x80200000 zImage
fatload mmc 0:1 0x80f00000 am335x-boneblack.dtb
fatload mmc 0:1 0x80f00000 nova.dtb
setenv bootargs console=ttyO0,115200n8
bootz 0x80200000 - 0x80f00000
````

# Terminal
### Open terminal
````bash
gtkterm -p /dev/ttyUSB0 -s 115200
````

# Kernel
````bash
# Get kernel sources
wget https://cdn.kernel.org/pub/linux/kernel/v5.x/linux-5.4.50.tar.xz

# Create a kernel config based on defaults
make ARCH=arm multi_v7_defconfig

# Modify kernel config
make ARCH=arm menuconfig
( config will be saved to .config file, use ls -a to view it on disk )

# Build kernel
sudo apt-get install libssl-dev
make -j 8 ARCH=arm CROSS_COMPILE=arm-cortex_a8-linux-gnueabi- zImage

# Build kernel with verbose logging
sudo apt-get install libssl-dev
make -j 8 ARCH=arm CROSS_COMPILE=arm-cortex_a8-linux-gnueabi- V=1 zImage

# Build kernel modules separately
make -j 8 ARCH=arm CROSS_COMPILE=arm-cortex_a8-linux-gnueabi- modules

# Install kernel modules
make -j8 ARCH=arm CROSS_COMPILE=arm-cortex_a8-linux-gnueabi- INSTALL_MOD_PATH=$HOME/rootfs modules_install

# Build device tree ( based on the multi_v7_defconfig )
make ARCH=arm dtbs

# Copy kernel and device tree to the boot media
cp arch/arm/boot/zImage arch/arm/boot/dts/am335x-boneblack.dtb /media/ton/boot/
````

# Rootfs

### Create rootfs
````bash
mkdir ~/rootfs
cd ~/rootfs
mkdir bin dev etc home lib proc sbin sys tmp usr var
mkdir usr/bin usr/lib usr/sbin
mkdir -p var/log
sudo chown -R root:root *
````

# Build busybox
````bash
git clone git://busybox.net/busybox.git
cd busybox
git checkout 1_36_0
make distclean
make defconfig
( Optional, do changes here ) make menuconfig
nano .config -> change 'CONFIG_PREFIX' to: /home/ton/rootfs
make ARCH=arm CROSS_COMPILE=arm-cortex_a8-linux-gnueabi-
make ARCH=arm CROSS_COMPILE=arm-cortex_a8-linux-gnueabi- install
````

# Create a ramdisk image
````bash
cd ~/rootfs
find . | cpio -H newc -ov --owner root:root > ../initramfs.cpio
cd ..
gzip initramfs.cpio
mkimage -A arm -O linux -T ramdisk -d initramfs.cpio.gz uRamdisk
attach SD card to host machine
cp uRamdisk /media/ton/boot
````

# Beaglebone
### Boot from SD card
````
Hold down the button near the SD card slot, power on the device, hold the button down for 5 seconds and release
Optionally press reset button
````

### Image size
````bash
uboot> bootz 0x80200000 0x81000000 0x80f00000
## Loading init Ramdisk from Legacy Image at 81000000 ...
   Image Name:   
   Created:      2023-04-26  15:29:33 UTC
   Image Type:   ARM Linux RAMDisk Image (gzip compressed)
   Data Size:    1612931 Bytes = 1.5 MiB
   Load Address: 00000000
   Entry Point:  00000000
   Verifying Checksum ... OK
## Flattened Device Tree blob at 80f00000
````

### Image files
````bash
debian@beaglebone:~$ ls -laih /media/boot/
total 24M
  1 drwx------ 2 debian debian  16K Apr 23 20:21 .
 18 drwxr-xr-x 3 root   root   4.0K Apr 23 20:20 ..
183 -rw-r--r-- 1 debian debian  57K Apr 26  2023 am335x-boneblack.dtb # Device tree
180 -rw-r--r-- 1 debian debian 106K Apr 25  2023 MLO                  # Secondary program loader ( SPL )
184 -rw-r--r-- 1 debian debian 128K Jan  1  1980 uboot.env            # Uboot environment variables
181 -rw-r--r-- 1 debian debian 872K Apr 25  2023 u-boot.img           # Uboot binary + header
186 -rw-r--r-- 1 debian debian  14M Apr 26  2023 uRamdisk             # Root file system in ramdisk format
182 -rw-r--r-- 1 debian debian 8.7M Apr 26  2023 zImage               # Compressed kernel image
````