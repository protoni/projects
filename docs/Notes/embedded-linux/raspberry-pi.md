##### Raspberry pi
````bash
### Setup SSH ###
# Enable ssh service
1. sudo raspi-config
2. Interfacing Options
3. SSH
4. YES

# Setup ssh keys
1. ssh-keygen
2. touch ~/.ssh/authorized_keys
3. copy the key from id_rsa.pub to authorized_keys

# Convert keys to be used on windows putty
Open puttygen -> Conversions -> Import key -> type password
-> Save public key and Save private key

# Disable password login from SSH to enable key login
1. sudo nano /etc/ssh/sshd_config
2. Uncomment and change to 'yes'
PubkeyAuthentication yes
3. Uncomment and change to 'no'
PasswordAuthentication no
4. sudo systemctl restart ssh

### Change forgotten password ###
1. Power down and take out the SD card
2. Plug the SD card in to PC
3. Edit 'cmdline.txt' file on the root of the SD card.
4. Add to the end of the file:
 init=/bin/sh
5. Put SD card back in to raspberry pi
6. In the prompt, type:
 su
7. Change the password using:
 passwd pi
8. If error occurs, type the mount command and again passwd pi:
 mount -o remount, rw /
# if error ( check cfdisk, lsblk etc.. the correct disk name):
 mount -o remount,rw /dev/sda2 /
9. Shutdown and re-edit the cmdline.txt the way it was, re-connect SD card to raspberry pi


#################################

### Change keyboard layout ###
# Change using raspi config
1. sudo raspi-config
2. Internationalisation Options
3. Change keyboard layout
4. Generic 104-key PC
5. Other
6. Finnish

# Edit /etc/default/keyboard
Change XKBLAYOUT=fi
##############################
````