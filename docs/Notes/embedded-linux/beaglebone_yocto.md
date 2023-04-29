
# Yocto kirkstone Yocto image for beaglebone

# Build

### Install dependencies
````bash
sudo apt-get install bc build-essential chrpath diffstat gawk git libncurses5-dev pkg-config socat subversion texi2html texinfo u-boot-tools liblz4-tool
````

### Clone yocto repo
````bash
git clone -b kirkstone https://git.yoctoproject.org/git/poky
````

### Source build env
````bash
source poky/oe-init-build-env
````

### Build minimal image
````bash
MACHINE="beaglebone-yocto" bitbake core-image-full-cmdline
````

### Setup sd card
````bash
1. make sure that sd card is empty
2. lsblk
  sdc           8:32   1    58G  0 disk
3. if not, sudo cfdis /dev/sdc -> delete all partitions and write
4. eject the sd card and connect back in, check that the card is empty
````

### Flash image to beaglebone
````bash
cd tmp/deploy/images/beaglebone-yocto
sudo dd if=core-image-full-cmdline-beaglebone-yocto.wic of=/dev/sdc bs=4M
````

### Bootup linux
````bash
Eject sd card, connect it to beaglebone
Open serial console:
  gtkterm -p /dev/ttyUSB0 -s 115200
Press and hold the button near the sd card slot to boot from sd card, power up the beaglebone
````

### Create extenesible sdk
````bash
bitbake core-image-full-cmdline -c populate_sdk_ext
````

### Add for example htop to the target image
````bash
# On target, htop missing
root@beaglebone-yocto:~# htop
-sh: htop: command not found
````

### Build and deploy new package
````bash
# Add new recipe to the sdk
devtool -d add https://github.com/htop-dev/htop.git --srcbranch main

# Fix recipe by adding 'FILES:${PN} += "/usr/share/icons"' or in older yocto versions 'FILES_${PN} += "/usr/share/icons"'
devtool edit-recipe htop

# Build the recipe
devtool build htop

# Deploy to the target
devtool deploy-target htop root@192.168.1.50
````

### Run new package on target device
````bash
# At this point the binary is on the target, but shared libraries are missing
root@beaglebone-yocto:~# htop 
htop: error while loading shared libraries: libnl-3.so.200: cannot open shared object file: No such file or directory
root@beaglebone-yocto:~#

# If the recipe depends on other packages ( for example in htop: DEPENDS = "systemd libcap libnl xz" ) that are not
# on the target device yet, image needs to be built and deployed to target. Sdk gets updated with workdir recipe and it's dependencies, so
# the image can be built with devtool
devtool build-image

# Alternatively, you can copy the runtime libs to the target:
# On the target, find out where the binary is located
root@beaglebone-yocto:~# find /usr/ -name "htop"
/usr/bin/htop

# Cd to target root
cd /run/user/1000/gvfs/sftp:host=192.168.1.50,user=root/home/root

# Source sdk
source ~/beaglebone_os/sdk/test_sdk_full/environment-setup-cortexa8hf-neon-poky-linux-gnueabi

# Find dependencies
for file in $(arm-poky-linux-gnueabi-readelf -a /usr/bin/htop | \
grep "Shared library" | \
sed -nr '/Shared library:/ s/.*Shared library:([^"]+).*/\1/p' | \
tr -d "[]"); \
do name=$(echo $file | cut -d '.' -f 1) && find /home/ton/beaglebone_os/build/tmp/sysroots-components/cortexa8hf-neon -name $name.*; \
done \
> dependencies.txt

# Copy libs to target
cat dependencies.txt | xargs -i sudo scp {} root@192.168.1.50:/usr/lib/

# Htop should now be usable on the target
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

# Apply the recipe to source tree
````bash
ton@mx-5:~/beaglebone_os/sdk/htop$ devtool finish htop ../../sources/meta-bbb/
````

# Yocto

### Create a custom layer
````bash
bitbake-layers create-layer ../sources/meta-bbb
bitbake-layers add-layer ../sources/meta-bbb
````

### Enable systemd
````bash
INIT_MANAGER = "systemd"
````

### Configure number of cores and threads for building
````bash
PARALLEL_MAKE="-j 8" BB_NUMBER_THREADS="16" bitbake <image>
````

### Show current devtool status
````bash
devtool status
````

### Run the image inside a emulator
````bash
runqemu beaglebone-yocto
````