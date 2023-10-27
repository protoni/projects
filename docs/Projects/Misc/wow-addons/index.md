---
title: Custom addons for WoW
date: "2020-01-20T18:17:37.121Z"
description: "Addons for WoW Classic"
tags: ["Misc"]
---

## Description
Found these few old videos from the classic wow launch when I was testing the
WoW LUA API. 

Idea was to create a `Purge addon` similar to `Steal&Purge` from later expansions.
At some point I realized that in classic, you can't see the enemy faction's buffs
so it became relatively pointless idea and I stopped working on it.

The second addon was more of a general framework for rendering addon UIs. Or at
least that's how it ended up as.

## Testing
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/maNrCGA.mp4" type="video/mp4">
  </video>
</dl>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/uQqriZf.mp4" type="video/mp4">
  </video>
</dl>

## Code
- World of Warcraft API
    - <https://wowpedia.fandom.com/wiki/World_of_Warcraft_API>
- First addon
    - This was the first test of the API, code is messy and unorganized. Also my
      first time writing LUA.
    - <https://github.com/protoni/dispel-addon>
- Second addon
    - Here I tried to organize the code a bit better. For example to have some
      sort of interface for the window rendering stuff, separate from the addon
      functionality. Also resizable windows etc.
    - <https://github.com/protoni/aasi-addon>
    - I don't have pictures/videos of this addon