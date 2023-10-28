

##### Angular setup
````bash
# Get started:
https://cli.angular.io/

npm install -g @angular/cli
ng new HelloWorld
cd HelloWorld
ng serve
````



##### Tutorials and links
````bash
# IDEs:
https://code.visualstudio.com/ Visual Studio Code
https://www.sublimetext.com/ Sublime Text


# HTML tutorial:
https://www.w3schools.com/html/default.asp

# CSS tutorial:
https://www.w3schools.com/css/default.asp

# JS tutorial:
https://www.w3schools.com/js/default.asp

#Mozilla Web APIs:
https://developer.mozilla.org/en-US/docs/Web/API

#NodeJS:
https://nodejs.org/en/

#GIT:
https://try.github.io/

# Invocation patterns:
http://blog.taylormcgann.com/2014/01/15/invocation-patterns-javascript/

# Prototype inheritance:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the…

# Rangle Book on Angular:
https://angular-2-training-book.rangle.io/

# Angular:
https://angular.io/

# Angular CLI:
https://cli.angular.io/

# TypeScript:
https://www.typescriptlang.org/

# John Resig advanced javascript:
https://johnresig.com/apps/learn/

# Learn SQL in 21 Days:
http://www.dmc.fmph.uniba.sk/public_html/doc/sql/index.htm

# SQL fiddle:
http://sqlfiddle.com

# GenerateData:
http://generatedata.com/

# W3Schools SQL tutorial
https://www.w3schools.com/sql/default.asp

# MongoDB manual:
https://docs.mongodb.com/manual/

# MongoDB tutorial:
https://www.tutorialspoint.com/mongodb/
````



##### Firefox allow fullscreen mode
````
go to about:config

full-screen-api.allow-trusted-requests-only:
true -> false
````



##### Internet explorer problems
````
# If nothing seems to work properly, check that doctype is in the top of the page:
<!DOCTYPE html>

-> Otherwise the code is meant to be run on old IE versions



# HttpRequests doesnt change; data returned by the server doesn't change after the first time it was received
# Use cache buster in HTTP requests:
Example:
    var CB = Math.random()*10000000000000000;
    var snd = "programControl=stop&CB=" + CB;

-> Random data is added to the end of the HttpRequest because IE caches HttpRequest responses.
-> Doing this trick we can make sure that IE won't fetch the cached data because the HttpRequest has changed

````



##### NodeJS notes
````bash
# Setting up NodeJS

# Create a directory for NodeJS app
create folder named for example 'html_events'

# Move to that directory
cd html_events

# Initialize npm
npm init

# For reference:
  "name": "html_events",
  "version": "1.0.0",
  "description": "html events",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "html",
    "events"
  ],
  "author": "toni",
  "license": "ISC"
  

# Install node modules
npm install express --save


# Create app.js file to the same folder where package.json is:
    const express = require("express");
    
    let app = express();
    
    app.use(express.static(__dirname+"/public_www"));
    app.listen(8080);
    
    console.log("Running in port 8080");

# Start NodeJS server:
node app

# Create web pages:
create public_www-folder
    index.html
    style.css
    script.js

# Check browser
localhost:8080
````



##### React notes
````bash
# Get and install React
1. Visit https://nodejs.org/en/
2. Download the latest LTS nodejs + npm packet
3. Install

# Take React into use by creating a simple app
1. Open nodejs command prompt
2. npx create-react-app my-app
3. cd my-app
4. npm start

# Deployment example:
https://www.reddit.com/r/reactjs/comments/d81gjb/how_to_deploy_your_app_setup_a_free_ssl/

# Cheat sheet:
https://github.com/LeCoupa/awesome-cheatsheets/blob/master/frontend/react.js

# Clean barebones project example for learning purposes:
https://www.reddit.com/r/reactjs/comments/arox51/i_made_a_barebones_fullstack_reddit_clone_to/

# Icons:
https://iconscout.com/unicons
https://github.com/Iconscout/react-unicons
https://github.com/react-icons/react-icons

# Good React practices.
https://www.reddit.com/r/reactjs/comments/cgxg7o/a_beginners_guide_to_writing_good_react_code/
https://arvind.io/posts/writing-good-react-code/
````



##### Gatsby notes
````bash

# Add video as inline HTML
Add video to /static/ folder
<dl>
  <video width="640" height="480" controls>
    <source src="../bandicam.mp4" type="video/mp4">
  </video>
</dl>

# Bold formatting 
To be able to use '_' in **bolded** text, it needs to be escaped with '\'-character infront of it
For example: io_scene_godot needs to be written like **io\_scene\_godot**
````



##### Wordpress notes
````bash



## Add borders to images ( adds borders to all images on the website )

# 1. Go to customize page
Dashboard -> Appearance -> Customize

# 2. Go to CSS settings
'Additional CSS'

# 3. Add custom CSS to the edit box
.post .entry-content img {border: 1px solid #000000;}

# 4. Click publish



## Install SiteLock-trust shield

# Get the shield

# 1. Go to SiteLock dashboard
https://secure.sitelock.com/dashboard

# 2. On the top of the page:
Click Deploy 'SiteLock Trust Seal' button

# 3. Fill out the settings

# 4. Copy the html code on the last settings page.



## Install the SiteLock logo to the website footer
# 1. Edit the page
Dashboard -> Appearance -> Customize

# 2. Make sure you have footer bar.
Layout -> Footer

# 3. Add the logo to footer
Widgets -> Footer bar -> Add a widget -> paste the html here.

# 4. Publish.



## Collapse content ( collapse text with a button click )

# 1. Install collapse pugin.
Show-Hide / Collapse-Expand

# 2. Add to a new post and wrap bg_collapse and /bg_collapse around brackets []:

bg_collapse view="link" color="#4286f4" icon="arrow" expand_text="Show More" collapse_text="Show Less"

your_content_here

/bg_collapse


## Collapse a whole block with a button click

# 1. Install Atomic Blocks plugin.

# 2. Add new AB container.

# 3. Add a code block inside the AB container.

# 4. Add to a new post:
bg_collapse view="link" color="#4286f4" icon="arrow" expand_text="Show More" collapse_text="Show Less"
<div class="wp-block-atomic-blocks-ab-container ab-block-container">
<div class="ab-container-inside">
<div class="ab-container-content" style="max-width:1600px">
Content1
</div>
</div>
</div>
/bg_collapse

# 5. Edit html:
add the bg_collapse and /bg_collapse tags wrapped around brackets [] around the div



## Add skip links

# 1. Add a new headline and edit the HTML.
- Hover over the headline and click the 3 dots ( more settings )
- Click 'Edit as HTML'

# 2. Add id="skipToHere" id for the tag
<h2 id="skipTo4">4. Add skip links<br></h2>

# 3. Write the link name to the top of the page.

# 4. Paint the link name with your mouse.

# 5. Click the 'paper clip' button and set the link to #skipToHere

````