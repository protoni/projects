
##### Notepad++ notes
````bash
# Replace tabs with spaces
Settings -> Language -> Tab Settings -> Replace by space and Tab size: 4

# Show hidden characters ( spaces and tabs )
View -> Show Symbol -> show White Space and TAB

# Format json:
Ctrl + Shift + Alt + m

# Base64 decode:
Plugins -> MIME tools -> Base64 decode
````

##### Vim
````bash
# Create vim config file
1. vim ~/.vimrc
2. write some basic settings in:
    set ruler laststatus=2 number title hlsearch
    syntax on
3. ESC -> :wq


## Random commands

# Paste from clipboard:
Mouse right click

# Re-do
Ctrl + r

# Undo
Esc -> u

# Search
Esc -> /

# Find and replace
:%s/old_text/new_text

# Open terminal
:ter

# Refresh current file
Esc -> :e!


## Moving

# Move to start of a line
Esc -> 0

# Move to start of a line
Esc -> 0

# Move forward one word (next alphanumeric word)
Esc -> w

# Move forward one word (delimited by a white space)
Esc -> W

# Move to the beginning of the file:
Esc -> gg

# Move to the end of the file:
Esc -> G
````

##### Visual studio
````powershell
# Disable command line
Console (/SUBSYSTEM:CONSOLE)

# Add library
1. Create include folder and add the header files in here
2. In Visual Studio: Project -> VC++ Directories -> add include folder to IncludeDirectories
3. Create lib folder and put the .lib in here
4. Add lib files to Linker -> General -> Additional Library Directories
5. Add assimp.lib to Linker -> Input -> Additional Dependencies
````

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