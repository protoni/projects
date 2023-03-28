

##### Setup FTP connection on Visual studio code
````powershell
# Setup FTP connection.
1. Install FTP-simple
2. modify config-file ( press F1 -> ftp-simple: config - FTP settings )
[
    {
        "name": "raspberry pi",
        "host": "192.168.1.35",
        "port": 22,
        "type": "sftp",
        "username": "USERNAME_HERE",
        "password": "",
        "promptForPass": false,
        "path": "/home/USERNAME_HERE/",
        "autosave": true,
        "confirm": false,
        "readyTimeout": 99999,
        "privateKey": "C:\\path\\to\\ssh\\private_key.ppk",
        "passphrase": "SSH_KEY_PASSWORD_HERE"
    }
]

3. Usage: Press F1 -> ftp-simple: Remote - remote directory open to workspace

# Show white spaces:
View -> Render Whitespace
````



##### Check checksum
````powershell
# SHA256
CertUtil -hashfile file_to_check.exe SHA256

# MD5
CertUtil -hashfile file_to_check.exe MD5
````



##### Check signatures
````powershell
# Setup on Windows

1. Download gpg4win

2. Check gpg4win signature
 certutil -hashfile gpg4win-3.1.7.exe SHA256
 certutil -hashfile gpg4win-3.1.7.exe MD5

3. Install gpg4win

4. Refresh environment variables of the command prompt 
 refreshenv
 
5. Download the file which we are checking the signatures from:
curl -o https://some_file

6. Download the signature creators public key and import to gpg4win
 curl -o some_file.pub
 gpg --import some_file.pub

7. Download signature
curl -o some_file.sig

8. Finally check the signature
 gpg --verify file_to_check.zip.sig file_to_check.zip
 
9. Verify the output:
gpg: Signature made 09/06/18 00:01:57 FLE Summer Time
gpg:                using RSA key F48B339EE7ADC266
gpg: Good signature from "Göran Krampe (getcanoe.io) <goran.krampe@gmail.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: DEEA 6E35 887D 0F0D 1C6E  196E F48B 339E E7AD C266


####### Example: verifying electrum signature ########

# 1. Download electrum:
curl -o electrum-3.3.8-setup.exe https://download.electrum.org/3.3.8/electrum-3.3.8-setup.exe

# 2. Download Thomas's public key:
curl -o electrum-3.3.8-setup.exe.pub https://raw.githubusercontent.com/spesmilo/electrum/master/pubkeys/ThomasV.asc

# 3. Download electrum signature:
curl -o electrum-3.3.8-setup.exe.sig https://download.electrum.org/3.3.8/electrum-3.3.8-setup.exe.asc

# 4. Import the public key to gpg:
gpg --import electrum-3.3.8-setup.exe.pub

# 5. Verify the application:
gpg --verify electrum-3.3.8-setup.exe.sig electrum-3.3.8-setup.exe
````



##### Setup CURL for MinGW
````powershell
# Setup CURL libraries for MinGW

- Install msys2
- Open msys2 shell
- cd curl-x.xx.x folder (cd C:/ ...)
- run configuration command:
    ./configure --prefix=/usr/local --with-ssl--build=x86_64-w64-mingw32 CPPFLAGS="-I/usr/local/include" LDFLAGS="-L/usr/local/lib"
- build curl:
    make install-strip

# gcc example:
    gcc curl_test.c -o curl_test -DCURL_STATICLIB -lcurl -I"C:\MinGW\include" -L"C:\MinGW\lib"
````



##### Setup dotnet
````powershell
# Download and install: 
https://www.microsoft.com/net/download

# List available project types:
dotnet new

# Create new project:
dotnet new webapi -o AspNetCoreWebTest

# Build
dotnet build

# Run
dotnet .\bin\Debug\netcoreapp2.1\AspNetCoreWebTest.dll
````



##### Powershell run linux commands
````powershell
# Download plink.exe
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

# Run commands on linux machine
.\plink root@192.168.1.35 cat /home/root/testfile.txt

# Give a command list to execute on linux machine
# With -m parameter you can give the the ssh server a list of commands, instead of opening a new shell.
# Create command.txt and put linux commands to it
# Run command
.\plink root@192.168.1.35 -i ..\ssh\private.ppk -m "command.txt" -t

# -x enable X11 forwarding
# -X disable X11 forwarding
# -v verbose output
````



##### Setup SSH key loading with KeePASS
````powershell
# Setup KeePass to serve SSH keys for GIT

# Setup KeePass
1. Download and install KeePass
2. Download KeeAgent plugin for KeePass
3. Unzip plugin to KeePass plugin folder ( C:\Program Files (x86)\KeePass Password Safe 2\Plugins\ )
4. Restart KeePass

# Create key pair
1. Download PuttyGen
2. Create key pair
3. Set a password for it
4. Save

# Setup keys
1. Add the public key to GitLab Settings -> SSH keys
- Add 'ssh-rsa' infront of the key
- Example:
    ssh-rsa AAAAB3NzaC1yc2EAA...
2. Add key

# Setup Keys to KeePass
1. Add new entry to KeePass
2. 'Entry' tab: Add GitLab username
3. 'Entry' tab: Add SSH private key password
4. 'Advanced' tab: Add public and private key to File Attachments
5. 'KeeAgent' tab: Tick 'Allow KeeAgent to use this entry'
6. Open Tools -> KeeAgent and add the key here
7. Restart KeePass
8. Right click the gitlab key entry and press Load SSH Key

# Setup GitBash
1. From KeePass open Tools -> Options -> KeeAgent
2. Add msys files
Cygwin compatible socket file:
- C:\Temp\cyglockfile
msysGit compatible socket file:
- C:\Temp\syslockfile
3. Create bash_profile file:
Create C:\Users\User\.bash_profile
4. add to bash_profile:
export SSH_AUTH_SOCK="C:\Temp\cyglockfile"
5. Restart git bash
6. Test connection:
ssh -T git@gitlab.compatible
7. should work now
````



##### Setup SSH keys PUTTY
````powershell
# Setup SSH keys between Windows and Linux

# 1. Download PuttyGen
https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html

# 2. Create new key pair with PuttyGen
Generate -> Save private key
Generate -> Save public key

# 3. In PUTTY save a new session
Set Saved Sessions name and click Save

# 4. Load the saved putty session

# 5. Set username
Connection > Data > login username

# 6. Set private key
Connection > SSH > Auth > browse private key

# 7. Log on to the Linux machine and create ~/.ssh folder if it doesn't existed
mkdir -p ~/.ssh

# 8. Create authorized_keys file
touch authorized_keys

# 9. Edit authorized_keys and add:
    ssh-rsa PUBLIC_KEY_HERE

# Note! Public key has to be on one line
````



##### Setup vnc
````powershell

# New putty connection:
hostname 192.168.10.38
Connection -> Data -> Auto-login username -> root
Connection -> SSH  -> Auth -> Private-key -> PUTTYGEN_GENERATED_KEY_HERE
Connection -> SSH  -> X11 -> tick 'Enable X11 forwarding'
Sessions -> save

-> Open new ssh connection with Putty

## On linux:
# Install tightvncserver
sudo apt-get install tightvncserver

# Run vncserver ( take a not on what is the vncserver number, it should show up when the command is run)
vncserver

# Set password

# To kill the server
vncserver -kill :# ( #- number is shown when vncserver is started )


## In PUTTY:
# Setup tunneling
Connection -> SSH  -> tunnels -> Source port: 5900
Connection -> SSH  -> tunnels -> Destination port: localhost:5901 ( last number should be the same number that vncserver showed up when starting it )
Add
Sessions -> save

# Open x11 connection from PUTTY

# Install tightvnc viewer

# Open new vnc connection
-> server: localhost

# This will be on as long as x11 Putty window is open

````



##### Webassemply setup
````powershell
# Install emscripten on Windows ( Rust )

# 1) Download
https://win.rustup.rs/

# 2) Install Rust
.\rustup-init.exe

# 3) Create a project folder

# 4) Open Git Bash

# 5) Install wasm pack
cargo install wasm-pack

# 6) Create Rust crate
cargo init

# 7) Modify Cargo.toml file
[package]
name = "hello-world"
version = "0.1.0"
authors = ["Name <name@example.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"

# 8) Rename src/main.rs -> src/lib.rs

# 9) Modify lib.rs
// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use wasm_bindgen::prelude::*;

// Our Add function
// wasm-pack requires "exported" functions
// to include #[wasm_bindgen]
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

# 10) Compile
wasm-pack build --target web

---------------------------------------------------------------------------

# Install emscripten on Windows ( C++ )

# 1) Open admin powershell
Win + R -> type powershell -> Ctrl + Shift + Enter ( to run as a admin )

# 2) Clone the emscriptenn repo
git clone https://github.com/emscripten-core/emsdk.git

# 3) Move to the project directory
cd emsdk

# 4) Allow scripts
Set-ExecutionPolicy RemoteSigned

# 5) Download and install the latest SDK tools.
./emsdk install latest

# 6) Make the "latest" SDK "active" for the current user. (writes ~/.emscripten file)
./emsdk activate latest --global

# 7) Activate PATH and other environment variables in the current terminal
.\emsdk_env.bat

# Install CMake

# Install MinGW

# 1) Download installer from https://sourceforge.net/projects/mingw/files/latest/download

# 2) Start the installer

# 3) In installation manager makesure these are included:
Basic Setup ->   
                 mingw-developer-toolkit
                 mingw32-base
                 mingw32-gcc-g++
                 msys-base

All Packages ->  MinGW -> MinGW Base System ->
                 mingw32-libpthreadgc dev
                 mingw32-libpthreadgc dll
                 mingw32-libpthreadgce dev
                 mingw32-libpthreadgce dll

# 4) Apply changes
Installation -> Apply Changes

# Create a project

# 1) Create a .c file hello.c

# 2) Add some code
#include <stdio.h>

int main(int argc, char ** argv) {
    printf("Hello World\n");
}

# 3) Compile
emcc hello.c -O3 -o hello.html

# 4) Run
python -m SimpleHTTPServer 8000

# 5) See results
http://localhost:8000/hello.html
````



##### Create portable .exe
````powershell
# Create a portable .exe on Windows

# Needed: 
- WinRAR
- A project folder containing the needed .dlls and other dependencies along with
the .exe.
- A .ico file for the .exe ( OPTIONAL )

1. Select all the files in a folder where the .exe is located.
2. Right click -> Add to archive.
3. General -> Browse -> set output location ( for example /Desktop )
4. General -> check 'Create SFX archive'
5. General -> Compression method -> Best
6. Advanced -> SFX options... -> Setup -> copy the .exe name to 
"Run after extraction"-field.
7. Modes -> check 'Unpack to temporary folder'
8. Modes -> select 'Hide all'
9. Update -> select 'Overwrite all files'
10. Text and icon -> Browse the lower of the 'Load XFS icon from file' fields ->
select icon for the .exe.
11. Click OK for the 'Advanced SFX options'
12. Click OK for the 'Archive name and parameters'


# There should now be a single .exe on the /Desktop ( Or the location you selected )

# Sources:
https://www.youtube.com/watch?v=EB-itJKvN5M
````



##### Miscellaneous
````powershell
# Record all the steps taken to produce an error
Win + R -> psr
````



##### Windows mysql-nodejs setup
````powershell
# Install MySQL server:
1. Download the installer.
2. Run
3. On the mysql installer, choose legacy authentication if you want to connect from NodeJS

# Setup test table:
1 Open mysql shell
2. \connect root2@localhost?connect-timeout=2000
3. \sql
4. create database test:
5. use test;
6. CREATE TABLE example ( id smallint unsigned not null auto_increment, name varchar(20) not null, constraint pk_example primary key (id) );
7. INSERT INTO example ( id, name ) VALUES ( null, 'Sample data' );
8. select * from example;
9. (OPTIONAL) if nodejs authentication fails:
ALTER USER 'root2'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'root2'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';


# NodeJS:
1. npm install mysql --save

############## app.js ##############
const express = require("express");
var mysql = require('mysql'); 

let app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use(express.static(__dirname+"/public_www"));
app.listen(8080);

console.log("Running in port 8080");
####################################
````