

##### CUPS commands
````bash
# Command line print:
lpr -o scaling=99 image.jp

# Print A3 sheet:
lp -d <printername> -o media=a3 -o landscape <filename> 

# Fit to page:
lp -d Pro100S-TurboPrint -o media=a3 -o fit-to-page -o landscape Downloads/00001.pdf
````

##### Change GRUB order
````bash
# Changes the order of the operating systems in GRUB window.
# Sets Windows as the first one to boot


sudo mv /etc/grub.d/30_os-prober /etc/grub.d/09_os-prober   # change windows index number
sudo grub-mkconfig -o /boot/grub/grub.cfg                   # create grub config file
````

##### Setup compact flash
````bash
# Check if the disk is connected:
dmesg | grep sdb

# Partitioning:
sudo mkfs.ext4 /dev/sdb1

# Mount:
sudo mount -t ext4 /dev/sdb1 /mnt

# Auto mount:
add row to /etc/fstab:
    /dev/sdb1       /mnt    ext4    defaults        0       1


# Other commands:
sudo parted /dev/sdb mklabel msdos
sudo parted -a opt /dev/sdb mkpart primary ext4 0% 100%
mount -a

````

##### Linux backup command
````bash
# Example backing up firefox user configs ( .mozilla folder )

tar zcPf ~/mozilla-backup-$($date + %s).tar.gz ~/.mozilla
````

##### Linux chmod
````bash
# SETUID:
chmod +s /path/to/file
````

##### Linux commandline welcome text
````bash
$ sudo apt-get install jq
$ cd /home/admin/download/
$ wget https://raw.githubusercontent.com/Stadicus/guides/master/raspibolt/resources/20-raspibolt-welcome
  
# check script & exit
$ nano 20-raspibolt-welcome

# delete existing welcome scripts and install
$ sudo mv /etc/update-motd.d /etc/update-motd.d.bak
$ sudo mkdir /etc/update-motd.d
$ sudo cp 20-raspibolt-welcome /etc/update-motd.d/
$ sudo chmod +x /etc/update-motd.d/20-raspibolt-welcome
$ sudo ln -s /etc/update-motd.d/20-raspibolt-welcome /usr/local/bin/raspibolt

In case the script runs into problems, it could theoretically prevent you from logging in. We therefore disable all motd execution for the "root" user, so you will always be able to login as "root" to disable it.

$ sudo su 
$ touch /root/.hushlogin
$ exit

You can now start the script with raspibolt and it is shown every time you log in.
````

##### Linux commands
````bash
# 1. redo last command but as root
sudo !!

# 2. open an editor to run a command
ctrl+x+e

# 3. create a super fast ram disk
mkdir -p /mnt/ram
mount -t tmpfs tmpfs /mnt/ram -o size=8192M

# 4. don't add command to history (note the leading space)
 ls -l

# 5. fix a really long command that you messed up
fc

# 6. tunnel with ssh (local port 3337 -> remote host's 127.0.0.1 on port 6379)
ssh -L 3337:127.0.0.1:6379 root@emkc.org -N

# 7. quickly create folders
mkdir -p folder/{sub1,sub2}/{sub1,sub2,sub3} creates 2 folders and 3 sub folders inside those ( 2 x 6 folders total)
mkdir -p folder/{1..100}/{1..100} # creates 100 x 100 folders

# 8. intercept stdout and log to file
cat file | tee -a log | cat > /dev/null

# bonus: exit terminal but leave all processes running
disown -a && exit

## Search for a phrase in text file and get the tailing and heading lines aswell
# get line number
$ cat /var/log/messages | grep -n "text_to_search" | cut -f1 -d:
1533

# Get +-10 lines near "text_to_search"
$ sed -n '1523,1543p' /var/log/messages

````

##### Linux GRUB
````bash
# Open GRUB command line in the bootloader menu
Press: 'c'

# To get back to bootloader menu from GRUB command line
Type in: normal

# Edit kernel boot parameters
Press: 'e'
````

##### Linux get process ID on port
````bash
# Which PID is using the port:
§ fuser 80/tcp
644

# Find the process name:
§ ls -l /proc/644/exe
````

##### Linux run script on boot
````bash
##################### Deprecated ########################
# How to create and run script on startup on Linux

1. sudo nano /etc/init.d/superscript, save and exit
2. sudo chmod 755 /etc/init.d/superscript
3. sudo update-rc.d superscript defaults

#########################################################

# Updated way of starting scripts on boot:

1. Create a script to run on startup. Example:
# startupScript.sh
###############################################

#!/bin/bash

for i in {1..10}
do
  # A way to exit the loop when CTRL + C is pressed.
  trap "echo Exited!; exit;" SIGINT SIGTERM
  
  echo "Starting the test $i"
  python /home/pi/gwtest/tester2.py -d /home/pi/gwtest/configs/TestLongPatter.txt
  echo "Ended the test $i"
done
  
###############################################

2. Create a service file:

# /etc/systemd/system/startupIOtest.service
###############################################

[Unit]
Description="StartIOtest"

[Service]
Type=forking
ExecStart=/bin/bash /home/pi/gwtest/startupScript.sh
TimeoutSec=0

[Install]
WantedBy=default.target

###############################################

3. Reload the daemon state
sudo systemctl daemon-reload

4. Enable the service startup on boot
sudo systemctl enable startIOtest.conf

Notes!
# To start the service immediately:
sudo systemctl start startIOtest

# Check the service status:
sudo systemctl status startIOtest

Not working:
# init file:
# startIOtest.conf
###############################################

start on runlevel [2345]
stop on runlevel [!2345]

exec bash /home/pi/gwtest/startupScript.sh

###############################################
````

##### Linux shell
````bash
--------------------------------------------------------------------------------------------


# get line number
$ cat /var/log/messages | grep -n "text_to_search" | cut -f1 -d:
1533

# get +-10 lines near "text_to_search"
$ sed -n '1523,1543p' /var/log/messages

--------------------------------------------------------------------------------------------
````

##### Linux unsupported distro mirrors
````bash
# 1. modify /etc/apt/sources.list and change ubuntu.com -> old-releases.ubuntu.com

# Or automatically:
    sudo sed -i -e 's/archive.ubuntu.com/old-releases.ubuntu.com/g' /etc/apt/sources.list

# 2. Update distro:
    sudo apt-get update && sudo apt-get dist-upgrade
````

##### Linux setup private internet access VPN
````bash

# Install OpenVPN
sudo apt-get install openvpn

# Download PIA VPN settings
sudo wget https://www.privateinternetaccess.com/openvpn/openvpn.zip

# Unzip
unzip openvpn.zip

# Run VPN
sudo openvpn Finland.ovpn


## Enable on boot:

# Create auth file
touch /etc/openvpn/auth.txt

# Edit auth.txt:
    add username to the first line
    password to the second line

# Set permissions
sudo chmod 600 auth.txt

# Copy PIA settings to OpenVPN folder
cp Finland.ovpn /etc/openvpn/

# Rename PIA settings
mv Findland.ovpn Finlanad.conf

# Edit PIA settings
change 'auth-user-pass' -> 'auth-user-pass auth.txt'

# Start VPN
sudo systemctl start openvpn@Finland.

# Make sure it works:
Check ip -> wget http://ipinfo.io/ip -qO -

# Set autostart on
edit /etc/default/openvpn and uncomment line: AUTOSTART="all"
````

##### Linux setup git SSH keys
````bash
# Create keys:
1. ssh-keygen -t rsa

# Create config:
2. nano ~/.ssh/config
    paste in file:
        Host gitserv
        Hostname github.com
        IdentityFile ~/.ssh/id_rsa
        IdentitiesOnly yes
        

3. paste ~/.ssh/id_rsa.pub content to github settings

# If 2fa has been enabled:
github.com -> User icon (top right) -> Settings -> Developer settings -> Personal access tokens
-> Generate new token -> Set name and scope -> save access token
Use access token in 'Password' field when pulling from github in command line
````

##### Linux create ssh keypair between machines
````bash

# Create keys
ssh-keygen -t rsa -b 2048

# Set the public key to ssh server
cat ~/.ssh/id_rsa.pub | ssh root@192.168.1.35 "mkdir -p ~/.ssh \ && cat >> ~/.ssh/authorized_keys"

# To skip password prompt:
scp tai ssh -o BatchMode=yes
````

##### Linux vim
````bash
# Create vim config file
1. vim ~/.vimrc
2. write some basic settings in:
    set ruler laststatus=2 number title hlsearch
    syntax on
3. ESC -> :wq
````


##### Linux wipeout disk
````bash
# Wipe out an hard drive on Linux.

1. List disks:
sudo fdisk -l

2. Pick a disk to clean

3. Wipe out

# less privacy way
sudo dd if=/dev/zero of=/dev/sda

# more privacy way
sudo dd if=/dev/urandom of=/dev/sda
````

##### Add sudo capable user
````bash
useradd ton
passwd ton
usermod -aG sudo ton
sudo chown $(whoami) ~
````

##### Add sudo capable user
````bash
# Arrow keys, Home, End, tab-complete keys not working in shell
1. chsh -s /bin/bash
2. Re-log
````

##### Arch linux quick install
````bash
cfdisk -> dos -> new -> 20G -> primary -> Linux (83) -> quit -> yes
mkfs.xfs /dev/sda1
mount /dev/sda1 /mnt
pacman -Sy tmux
tmux
pacstarp /mnt base linux
arch-chroot /mnt -> passwd
Ctrl + D
genfstab /mnt>/mnt/etc/fstab;arch-chroot /mnt bash -c 'pacman -Sy grub;grub-install /dev/sda;grub-mkconfig -o /boot/grub/grub.cfg';reboot
````

##### Linux GRUB
````bash
# Parse images to text
curl -s 'https://pbs.twimg.com/media/E9T96Q9XIAcs8xJ?format=jpg&name=large' -o - | tesseract stdin stdout | grep --color 609
````

##### Install Docker
````bash
#!/bin/bash

# Check if Docker is already installed
if [[ $(docker --version | grep "Docker version") == "" ]]; then
    
    echo "Docker installation not found! Installing.."
    
    # Install dependencies
    sudo apt update
    sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

    # Add Docker repository
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update

    # Install Docker
    sudo apt install -y docker-ce docker-ce-cli containerd.io

    # Start Docker service
    sudo systemctl start docker
    sudo systemctl enable docker

    # Set permission run for users
    sudo usermod -aG docker $USER

    echo "Docker installed."
else
    echo "Docker is already installed."
fi
````