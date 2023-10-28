---
title: Component storage
date: "2020-09-25T22:35:03.284Z"
description: "Working on a component storage system for my electronic parts."
tags: ["web"]
---

Building a component management system.

---

### Background

So I have accumulated a bit of a collection of electronic components, developer boards and all sorts of electronics parts for various projets and
managing these has been a mess so far. Most of them are still in these boxes that they were delivered in, lying around in my place.
I have managed to label a small portion of them with a part number and added them to an excel sheet, but I'm not really satisfied with this solution.

##### Alternatives
I also tried a bunch of free component management systems and everytime they seemed to be missing some key functionality that I need/want. 
There was a one potential open source component management system called **Partkeepr** that seems to have everything. 

##### Setting up Partkeepr
- I tried setting that up first to my Windows machine, got a bunch of errors and on the website it says:
**Windows is not supported, so proceed on your own risk.** so I gave up on that idea.

- Then I decided to try to install it on a VPS ( virtual private server ). Spinned up my droplet on
DigitalOcean and tried to setup Partkeepr there. Turns out that the **composer** tool that the setup uses, requires something like 4GB of RAM to work. 
That would be pretty costly to run on a VPS.

- Lastly I setup my raspberry pi, hoping that I could run Partkeepr on that. I spent the whole night trying to get the partkeepr to work. I wrote my notes here, although
they got left unfinished:
- <https://protoni.github.io/notes/Notes/random/?h=partkeep#partkeepr-setup>

127 lines of notes.

If I remember correctly at the end I had an issue where the install system would complain about some parameters.php file not being on the file system, and to generate that
said file, I must visit the install system that doesn't work without that file..

Then I noticed that on the PartKeepr website there are instructions on how to run PartKeepr from Git. The instructions were pretty short so I decided to try that. 
Again, errors after errors so I just gave up. Maybe I was doing something very wrong here or it just really is a overly complex system. The project owners also seem to have
stopped maintaining the project 3 years ago.

##### Conclusion

I finally started developing my own component storage solution using **React** front end + **NodeJS** backend. 
Mainly to just learn/re-learn React and refresh my memory on javascript world. This was my decision anyway even before trying open source / free alternatives.
It's probably not going to be very fancy, just a simple website that supports the few functionalities that I actually need from such a system.



---

### Current system

**Old component management system (.csv file)**

![csv file](https://i.imgur.com/mFxoMdz.png)



**Components labeled with a part number**

I decided on the part numbering system years ago without giving it much of thought and I'm too lazy to change it at this point.
Basically all the dev boards, shields and so on has a 'A' prefix, electronic components has a 'B' prefix, misc parts has a 'C' prefix.
The numbers just increment from 1. 

In the component storage system I'll probably add zero padding to the front of the part number to make them all equal lengths.
So the part numbers will be something like B0000137, B0000007 and so on. The label it self doesn't need the zero padding.
![items](https://i.imgur.com/PsGOmSZ.jpg)



**Storage organizers for the parts**

Bought these storage organizers for this project + theres a bunch of boxes and bags waiting to get in to the system.
![lockers](https://i.imgur.com/L7PI4WB.jpg)



---

### Setup

**React front end up**

Copy pasted some basic React setup from one of my old projects that was left unfinished. 
Basic routing for the navigation bar was done already and some styles + themes to make the site not look like a blank white page, 
just had to scrap some stuff away to make it a good starting point for
this project. 

Added some input fields for the component. These field names and component info will most likely change as I develop this further.
![website at the beginning](https://i.imgur.com/SN74HMT.png)



**Backend call**

Got a basic NodeJS backend setup  up and testing the connection with React to the backend.
Front-end is running on http://localhost:3000/ and Backend on http://localhost:3001/.
![First backend call](https://i.imgur.com/zYeJm4f.png)



**MySQL database**

Got a database setup for the project. I got the backend code from my old project as well, which also used mysql for a database so after
a few struggles I got a data flowing from the front end to the database. 

I just noticed that also the database seems to still include a table called 'blog_posts' from the old project, even though I just installed
the MySQL server 😁 Not sure if old backend code managed to do a backend call or are the databases saved to the same place and the old tables were loaded.
![Add component to database](https://i.imgur.com/wnc6vGU.png)



**Raspberry pi**

I flashed a new Linux image to a SD card and booted it with one of the raspberry pi's that I have lying around. I got the React + NodeJS + MySQL setup to run
on there as well but building the code is so slow so I moved my dev environment to my Windows machine.

---



### Adding basic functionality

#### List all components

Couldn't really decide on what to work on first, so I decided to build a dynamic table to show all the components. 
There is no pagination yet though, I'll probably do that later when I start to have lots of actual components in the database. 
I'm using React bootstrap front-end framework for the project and it seemed to have a ready made pagination component so I'll probably use that one.
![Get all components](https://i.imgur.com/M0ddCm5.png)



#### Adding components

I decided to hide the 'add component' functionality to a modal. I don't really like to use modals but for this I think it's better than to redirect to another
page for example. Also some sort of drop downs for long forms are annoying. 

..I really have no idea how to develop websites or what is a good user experience, I just
try to get things to work first and then make them better (maybe).
![Add components modal](https://i.imgur.com/dDMzP1H.png)



**Component view**

The component listing without any input fields is a bit more clear now I think. Clicking 'Add' button will open the modal that contains input fields to add a component.
![Without text inputs](https://i.imgur.com/yz5roIQ.png)



**New layout**

Native html fields were ugly and the layout was kind of all over the place so I decided to work on that a little. This uses the React bootstrap input forms.
![New input forms](https://i.imgur.com/MYoX0fG.png)



#### Attachments

One functionality that wasn't done very well or was missing completely from the free alternatives, is the ability to attach files to a component. For example images,
datasheets, example code/drives and various zip files.



**Testig drag and drop file upload**

Dragging and dropping a file on the "Try dropping files here.."-text and console logging the file object.
![Add file](https://i.imgur.com/bWY3NAl.png)



**Preview images when dropped**
![Preview image](https://i.imgur.com/Eg6V1nH.gif)



**Sending the files to the backend for storing**

Using **requests** from superagent package to handle the file upload. File storage is a folder on the repository for now ( added in .gitignore).

![File upload](https://i.imgur.com/1HVlfOM.gif)



**Preview support for other file types**
![File types](https://i.imgur.com/bZTDd4I.png)



**Styling the drag and drop box**
![Drag and drop style](https://i.imgur.com/W1ZC0t8.gif)



**Upload folder structure**

A folder is created to the main filestorage for each component that has file attachments. 
Folder name is the part number ( ID field in the table ) of the component.
![File structure](https://i.imgur.com/Igg9RN1.png)



**Summary**

It was a bit more complex to make this work than I originally thought. Some key notes:
- Basically when a component is added, the input field data, and all the files are sent as a separate requests to the backend.
- I couldn't figure out how to add the part number or some ID to the file post request.
- The file upload requests sometimes ended up to the backend first and since they are without an ID they need to wait
for the component data request to arrive.

The file upload still needs some work, but it's good enough at least for now.



### View component

**Part number ( 'ID' column currently ) is a clickable link that is routed to a component's own view**
![Select item](https://i.imgur.com/8g5xHDv.png)



**Component view + storage folder**

A placeholder layout for a single component view page + component's file structure
![Storage item files](https://i.imgur.com/kjc3p0N.png)



**Download files**

Attachment file can be downloaded by clicking the filename.
![Download a file](https://i.imgur.com/bT4Piog.gif)



---

### Summary
I have been working on this project for a week now, a couple of hours in the evenings and it seems to be moving forward quite nicely, learned a lot so far.
I'll probably end this post here and do a some 'component storage update' post when I have more progress done and pictures taken. 

I don't like to keep writing these posts as I go along with the projects so I just write these in one sitting and be done with them. I just decided
that this is a good break point to write things down before I forget them.

The component storage system obviously has alot of things left to do and a few key functionalities missing like search and an edit component functions, more
on that in the TODO section.




---

# TODO
Not a complete list, just throwing things here from the top of my head.

- [x] Setup dev env
- [x] Front-end and backend setup
- [x] Preliminary component listing page
- [x] Preliminary component view page
- [x] Preliminary component add function
- [x] Preliminary file uploader
- [x] File handling on the backend
- [ ] Search component-function
- [ ] Edit component-function
- [ ] Figure out proper names for component data fields
- [ ] Add proper layout for the single component view page.
- [ ] File upload system in 'add component' view needs an option to select thumbnail picture
- [ ] Item type selector to the 'add component'-view ( component, dev board, misc ).
- [ ] Change input fields based on the type in the 'add component'-view.
- [ ] Add tests
- [ ] Remove files-button in add component-view.
- [ ] Re-structure backend code
- [ ] Bulk import components from .csv
- [ ] Image / pdf / text file viewer to the single component view page
- [ ] Auto backup system for the database and attachment files



