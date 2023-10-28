---
title: Website in development
date: "2020-07-17T21:27:37.121Z"
description: "I added annoying popups."
tags: ["protoni website"]
---

### About
I'm experimenting with this site so it might be broken from time to time. 
I added an notification to the index page to indicate that, it will popup every time the page is loaded.

Decided to make a post about that too to get some content to the empty home page.

![Notification popup](https://i.imgur.com/tFGJs10.gif)

Tried a bunch of different notification React packages but couldn't get them to work the way I wanted.
I also did my own notification component to refresh my memory on how this react and javascript stuff works 
but that came out as pretty shite.
 
Gladly I finally found one that worked and was easy to implement, **react-toastify**.
The notification doesn't really look good on mobile at the moment tho.


Did this with a few lines of code:
![Notification codes](https://i.imgur.com/0fy9h2b.png)

### Update 23.07.2020
I also added tag system to the website for easier access to related content.
![Tags](https://i.imgur.com/k1kcs88.png)

Tags can be seen on the front site below the post name and also on the individual blog post pages.

Basically the tags are added to the frontmatter of the markdown files and so they can be queried using graphql.

The visual layout still might need some decorating but it works.
![Minimal tags](https://i.imgur.com/7P4jj2f.png)

### Links
- <https://www.npmjs.com/package/react-toastify>
- <https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/>