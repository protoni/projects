---
title: Yocto Linux for BeagleBone
date: "2023-05-27T18:17:37.121Z"
description: "Yocto Kirkstone for BeagleBoneBlack board"
tags: ["Linux"]
---

## Description
Build and setup Yocto Kirkstone Linux image for BeagleBone

## Build

````bash
# Install dependencies
sudo apt-get install bc build-essential chrpath diffstat gawk git libncurses5-dev pkg-config socat subversion texi2html texinfo u-boot-tools liblz4-tool

# Clone yocto repo
git clone -b kirkstone https://git.yoctoproject.org/git/poky

# Source build env
source poky/oe-init-build-env

# Build minimal image
MACHINE="beaglebone-yocto" bitbake core-image-full-cmdline
````

## Boot up
````bash
# Setup sd card
1. make sure that sd card is empty
2. lsblk
  sdc           8:32   1    58G  0 disk
3. if not, sudo cfdisk /dev/sdc -> delete all partitions and write
4. eject the sd card and connect back in, check that the card is empty

# Flash image to beaglebone
cd tmp/deploy/images/beaglebone-yocto
sudo dd if=core-image-full-cmdline-beaglebone-yocto.wic of=/dev/sdc bs=4M

# Bootup linux
Eject sd card, connect it to beaglebone
Open serial console:
  gtkterm -p /dev/ttyUSB0 -s 115200
Press and hold the button near the sd card slot to boot from sd card, power up the beaglebone
````

## SDK
##### SDK Setup
````bash
# Create extenesible sdk
bitbake core-image-full-cmdline -c populate_sdk_ext

# Install SDK
Set executable if it isn't already and run the script'

# set executable if it isn't already and run the script
chmod +x tmp/deploy/sdk/poky-glibc-x86_64-core-image-full-cmdline-cortexa8hf-neon-beaglebone-yocto-toolchain-ext-4.0.9.sh
./tmp/deploy/sdk/poky-glibc-x86_64-core-image-full-cmdline-cortexa8hf-neon-beaglebone-yocto-toolchain-ext-4.0.9.sh

# To change the install directory
./tmp/deploy/sdk/poky-glibc-x86_64-core-image-full-cmdline-cortexa8hf-neon-beaglebone-yocto-toolchain-ext-4.0.9.sh -d /my/path/here

# SDK Usage
source /home/ton/beaglebone_os/sdk/test_sdk_full/environment-setup-cortexa8hf-neon-poky-linux-gnueabi
````

## Yocto Recipes
##### Add new packages
````bash
# Example: Add recipe to the target image

# On target, htop missing
root@beaglebone-yocto:~# htop
-sh: htop: command not found

# Add new recipe to the sdk
devtool -d add https://github.com/htop-dev/htop.git --srcbranch main

# Try to build the recipe
devtool build htop

# Edit recipe
# Fix recipe by adding 'FILES:${PN} += "/usr/share/icons"' or in older yocto versions 'FILES_${PN} += "/usr/share/icons"'
devtool edit-recipe htop

# Deploy to the target
devtool deploy-target htop root@192.168.1.50
````

##### Run new package on target device
At this point the binary is on the target, but shared libraries are missing
````bash
root@beaglebone-yocto:~# htop 
htop: error while loading shared libraries: libnl-3.so.200: cannot open shared object file: No such file or directory
root@beaglebone-yocto:~#
````

If the recipe depends on other packages ( for example in htop: DEPENDS = "systemd libcap libnl xz" ) that are not
on the target device yet, image needs to be built and deployed to target. Sdk gets updated with workdir recipe and it's dependencies, so
the image can be built with devtool
````bash
devtool build-image
````

Alternatively, you can copy the runtime libs to the target:
On the target, find out where the binary is located
````bash
root@beaglebone-yocto:~# find /usr/ -name "htop"
/usr/bin/htop
````

Cd to target root
````bash
cd /run/user/1000/gvfs/sftp:host=192.168.1.50,user=root/home/root
````

Source sdk, if not sourced already
````bash
source ~/beaglebone_os/sdk/test_sdk_full/environment-setup-cortexa8hf-neon-poky-linux-gnueabi
````

Find dependencies
````bash
for file in $(arm-poky-linux-gnueabi-readelf -a /usr/bin/htop | \
grep "Shared library" | \
sed -nr '/Shared library:/ s/.*Shared library:([^"]+).*/\1/p' | \
tr -d "[]"); \
do name=$(echo $file | cut -d '.' -f 1) && find /home/ton/beaglebone_os/build/tmp/sysroots-components/cortexa8hf-neon -name $name.*; \
done \
> dependencies.txt
````

Copy libs to target
````bash
cat dependencies.txt | xargs -i sudo scp {} root@192.168.1.50:/usr/lib/
````

Htop should now be usable on the target
````bash
  CPU[||||||                                                           7.1%] Tasks: 29, 1 thr, 64 kthr; 1 running
  Mem[||||||||||||||                                             30.1M/488M] Load average: 0.89 0.23 0.08 
  Swp[                                                                0K/0K] Uptime: 00:00:39

  [Main] [I/O]
  PID USER       PRI  NI  VIRT   RES   SHR S  CPU%-MEM%   TIME+  Command
  210 root        20   0  4036  3116  2356 R   2.6  0.6  0:00.22 htop
    1 root        20   0 10076  7188  5788 S   0.6  1.4  0:04.44 /sbin/init
  184 messagebus  20   0  4932  3116  2804 S   0.6  0.6  0:00.31 /usr/bin/dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activati
  133 rpc         20   0  3936  2248  2020 S   0.0  0.4  0:00.03 /usr/sbin/rpcbind -w -f
````

Apply the recipe to source tree
````bash
ton@mx-5:~/beaglebone_os/sdk/htop$ devtool finish htop ../../sources/meta-bbb/
````

## Links
- Github
    - <https://github.com/protoni/beaglebone-os>