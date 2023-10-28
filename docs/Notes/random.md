

##### How to create skip links in Atlassian confluence wiki pages
````
# How to create skip links in Atlassian confluence wiki pages

1. Create headline, for example:
Test Headline 1

2. Click to the top of page and from the edit tools click Link ( Ctrl + K )

3. Paste the page URL to here, if not published yet, publish it first and then edit to get the proper URL

4. add /#Test-Headline-1 to the end of the URL ( Notice the - (dash) sign to replace white spaces )

5. Press enter

6. Edit the link again.

7. Set the 'Text to display'-text

8. Press enter.
````


##### Docker notes
````bash
# List running images
sudo docker ps

# Stop docker container
sudo docker stop 119cbb3f26f2 (container id)

#(-it runs docker in interactive mode, so you can stop it witch CTRL + c)
sudo docker run -it myexpressapp

# Show ip:
docker exec -it [CONTAINER_ID] ip addr show eth0

# On browser:
http://172.17.0.2:3000/
````


##### Electron building
````bash

# 1
npm install electron-packager -g
electron-packager <sourcedir> <appname> --platform=win32 --arch=x64

# 2
electron-builder -p --win

# Preferred way of building electron apps:
Use the #1 method and then create a portable .exe from the output build folder
````

##### MuroBBS notes
````bash
# Add embedded imgur image to muroBBS forum:
[MEDIA=imgur]kaD578M[/MEDIA]

# Add embedded imgur image gallery to muroBBS forum:
[MEDIA=imgur]a/kaD578M[/MEDIA]
````

##### Trello notes
````bash
# Trello power-ups creation

# Getting started:
https://developers.trello.com/docs/get-started
https://developers.trello.com/docs/your-first-power-up

# Step 1
https://trello.com/power-ups/admin/
-> create new


# Trello REST API Docs
https://developers.trello.com/reference#introduction


# Example project video:
https://www.youtube.com/watch?v=dLCkcQnwAQk

# API calls:
https://developers.trello.com/reference/#introduction



# Get board id ( or card id):
- For example if your board URL is:
https://trello.com/b/c0xTyrUZ/ddd

- Add .json at the end and paste it to browser url field:
https://trello.com/b/c0xTyrUZ/ddd.json

- id: 3de884e4e0766a67efd2g1f9
````

##### Vulkan notes
````
Vulkan



# Instance
The very first thing you need to do is initialize the Vulkan library by creating an instance. 
The instance is the connection between your application and the Vulkan library and creating 
it involves specifying some details about your application to the driver.


# Extensions
Vulkan is a platform agnostic API, which means that you need an extension to interface with the window system.
Vulkan extensions are simply additional features that Vulkan implementations may provide if they so choose to.
They add new functions, structs, and valid enumerators to the API, and they can change some of the behavior of existing functions.

# Validation layers
Different layers needed for code validation, e.g. error handling. "All-round"-global validation layer can be turned on
to provide error handling for all functionaliy.


# Queue
A queue is something you submit command buffers to, and command buffers submitted to a queue are executed in order relative to each other.
Command buffers submitted to different queues are unordered relative to each other unless you explicitly synchronize them with VkSemaphore. 
You can only submit work to a queue from one thread at a time, but different threads can submit work to different queues simultaneously.

Each queue can only perform certain kinds of operations:
- Graphics queues can run graphics pipelines started by vkCmdDraw* commands. 
- Compute queues can run compute pipelines started by vkCmdDispatch*. 
- Transfer queues can perform transfer (copy) operations from vkCmdCopy*.
- Sparse binding queues can change the binding of sparse resources to memory with vkQueueBindSparse
(note this is an operation submitted directly to a queue, not a command in a command buffer)
- Some queues can perform multiple kinds of operations.
- In the spec, every command that can be submitted to a queue have a "Command Properties" table that lists what queue types can execute the command.

# Queue family
A queue family just describes a set of queues with identical properties.
For example, the device supports three kinds of queues:
- One kind can do graphics, compute, transfer, and sparse binding operations, and you can create up to 16 queues of that type.
- Another kind can only do transfer operations, and you can only create one queue of this kind. 
Usually this is for asynchronously DMAing data between host and device memory on discrete GPUs, so transfers can be done concurrently with independent graphics/compute operations.
- Finally, you can create up to 8 queues that are only capable of compute operations.
````

### Partkeepr setup
````bash
## Setup
# 1. Install php
sudo apt-get install php

# 2. Find out which php.ini file is the web server using
Create a file named 'phpinfo.php' to the /var/www/html/ folder
Add to the file:
 <?php
 phpinfo();
 ?>
Go to the web page with a browser: http://192.168.1.35/phpinfo.php
Check the 'Loaded Configuration File' field

# 3. edit php.init
nano /etc/php/7.3/cli/php.ini

# 4. make sure that:
 4.1 'allow_url_fopen' is on
 4.2 safe_mode = Off
 4.3 'extension=fileinfo' uncomment this
 4.4 Set the timezone for this field: date.timezone = Europe/Helsinki 
 ( see available timezones here: https://www.php.net/manual/en/timezones.php )
 4.5 uncomment: extension=gd2
 4.6 uncomment: extension=ldap

# 5. Make sure that apache is installed and running

# 6. Install php curl
sudo apt-get install php7.3-curl

# 7. Install DoctrineORM
sudo apt-get install composer
composer require doctrine/doctrine-orm-module

# Had this file under the folder where I ran 'composer require', not sure if relevant:
 {
    "require": {
        "doctrine/orm": "^2.6.2",
        "symfony/yaml": "2.*"
    },
    "autoload": {
        "psr-0": {"": "src/"}
    }
}

# 8. Download partkeepr.zip and extract to /var/www/html/
https://partkeepr.org/download/

# 9. Go to the setup folder with a browser
http://192.168.1.35/partkeepr-1.4.0/web/setup/

# 10. Click next and fix all of the possible errors and warnings. I had to change these:
sudo nano /etc/php/7.3/cli/php.ini -> set 'max_execution_time' to 600
sudo apt-get install php7.3-gd
sudo apt-get install php7.3-ldap
sudo apt-get install php-xml
sudo apt-get install php7.3-mysql
sudo apt-get install php-intl
sudo apt-get install php-apcu php-apcu-bc
sudo chmod -R 777 /var/www/html/parkeepr-1.4.0/data
sudo chmod -R 777 /var/www/html/parkeepr-1.4.0/app
sudo chmod -R 777 /var/www/html/parkeepr-1.4.0/web

# Had a few warnings left, will fix them if issues occur
- PHP APCu cache not found
- Maximum Execution Time might be too low

# 11. Fix Web Server Configuration error
# Edit apache config /etc/apache2/apache2.conf and add these:
    # Include external config
    Include /etc/apache2/httpd.conf
    
# Create /etc/apache2/httpd.conf and add these:
    <VirtualHost *:80>
        ServerName localhost

        DocumentRoot /var/www/html/partkeepr-1.4.0/web/
        AcceptPathInfo on

        ErrorDocument 403 "<h1>Item management system update in progress. Check back in a few minutes.</h1>"

        <Directory /var/www/html/partkeepr-1.4.0/web/>
                Require all granted
                AllowOverride All
        </Directory>

        ## Logging
        ErrorLog "/var/log/apache2/partkeepr_error.log"
        ServerSignature Off
        CustomLog "/var/log/apache2/partkeepr_access.log" combined
    </VirtualHost>

# Enable .htaccess. Edit /etc/apache2/sites-available/000-default.conf, add lines:
    # Enable .htaccess file
    <Directory "/var/www/html/partkeepr-1.4.0">
      AllowOverride All
    </Directory>

# Create .htaccess file
touch /var/www/html//var/www/html/partkeepr-1.4.0/.htaccess

# Activate mod_rewrite
sudo a2enmod rewrite

# 12. Restart apache if there was errors
sudo systemctl restart apache2

# 13. Follow the partkeepr setup until SQL connection part ( Take a note on the database creation queries).

# 14. Install a database
sudo apt install mariadb-server-10.0
sudo /usr/bin/mysql_secure_installation
    Change the root password? [Y/n] n
    Remove anonymous users? [Y/n] y
    Disallow root login remotely? [Y/n] y
    Remove test database and access to it? [Y/n] y
    Reload privilege tables now? [Y/n]

# 15. Log in to the root database user
sudo mysql -uroot -p

# 16. Create the database
CREATE DATABASE Storage CHARACTER SET UTF8;
GRANT USAGE ON *.* TO root@localhost IDENTIFIED BY 'PUT_PW_HERE';
GRANT ALL PRIVILEGES ON Storage.* TO root@localhost;

# 17. 
````

### WebOS notes ( SmartTV app programming )
````bash
# Build
ares-package aasi-app

# Install package
ares-install --device tv2 ./com.aasi.app.aasiapp_0.0.1_all.ipk

# List installed packages
ares-install --device tv2 --list

# Launch app
ares-launch --device tv2 com.aasi.app.aasiapp

# Close app
ares-launch --device tv2 --close com.aasi.app.aasiapp
````

### BatMUD
````bash
# Show inventory:
i

# Show equipment
eq

# Search info:
hfind
( Example: hfind armours )

# Run away:
wimpy now

# Show health:
sc

# Show player info
score

# Show experience and money
exp

# Show info on players
finger
( Example: finger protoni )

# Look around and items
look scenery

# Dwarf mountain wizard password
kalacucco



# Newbie help:
help newbie helpers

# teleport?
touch post

# Levelup:
advance level

# Check levelup cost:
advance cost

# Adventurer guild locations:
Dortlewall, Pleasantville, Arelium and Calythien

# At lvl 16:
help free levels

# Lots of rooms ( exp ):
wane-mountain

# Good starter items:
Dortwall 'crystite credits' 

# Cheap items:
Damogran's warehouse
- Located 1 east, 2 north from the church altar, and there's a portal to his warehouse in Dortlewall and Pleasantville
````

### Rust
````bash
# Update rustc, cargo etc..
rustup update stable

# Error: specified package has no binaries
cargo install cargo-edit
cargo add pdb

# Start a new project
mkdir test_project
cd test_project
cargo init

# Run project
cargo run

# Build project without running
carco build

# Create a release
cargo build --release

# Generate docs based on dependencies
cargo doc --open
````

### Convert GIF to video
````bash
# Install ffmpeg:
sudo apt-get install ffmpeg

# Install on Windows:
choco install ffmpeg

# Convert GIF to video
ffmpeg -i input.gif -c:v libx264 -pix_fmt yuv420p output.mp4
````