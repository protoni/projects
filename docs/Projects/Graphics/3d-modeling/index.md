---
title: 3D Modeling
date: "2024-08-10T18:14:37.121Z"
description: "3D Modeling"
tags: ["graphics"]
---

## Description
I was learning 3D modeling during my summer vacation. I used this Udemy course to get started
<https://www.udemy.com/share/101YUy3@1RM55kQZYjQSsqY5m-4vQ8VuYGDHxzpC756FLcrH8KXWWwHsrqELbUO9HJxwIxdm/>, can recommend.

There's about 17 hours of video material and it took me 3-4x longer to follow along. Also I skipped a few things, for example
weight painting the head of the character due to an issue with the sub-meshes like teeth, eyes and horns. Need to try to fix
that and take the time to figure out the issue in the next 3d modeling project. The issue summarized; I couldn't attach the
sub-meshes to the head bone for some reason. 

Here's some progress pictures and details on the different steps, which I have already forgotten most of so the list lacks a lot of
important points and steps. Also the descriptions of the steps might be/are a bit off especially the retopology and baking one.
 Also didn't take any pictures of the UV-unwrapping and setting of the seams -step. I'll have to revisit these once I work on 
 the next project and refresh my mind on the details.

## Progress

##### Finished
Animated in Unreal Engine
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/q7cbNDp.mp4" type="video/mp4">
  </video>
</dl>


##### Blocking

Setting up the concept art layout pictures and blocking out the character
![Preview](https://i.imgur.com/E0PRRZI.png)


##### Subdivide

Applied subdivide surface modifier to add more resolution for sculpting the basic shape.
![Preview](https://i.imgur.com/aMxy6Mp.png)


##### Sculpting
Character is then by re-meshed to up-scale the resolution even further for detailed sculpting.
![Preview](https://i.imgur.com/M2aTkU4.png)

After re-meshing and detailed sculpting, the character is about 2 million triangles.
![Preview](https://i.imgur.com/CexrZkp.png)

##### Retopology + Baking
Now that the character is about 2million triangles, it would lag out the game engines when trying to load that in.
So the model and it's sub-meshes are copy-pasted in the exact same position and the low poly copies 
are re-meshed down back to fewer triangle count. Then the detailed high poly model's normal and cavity data is 'baked' into textures or
'normal and cavity maps', that are then applied to the low-poly version's shaders.

So here is the low-poly version with about 12k triangles as opposed to the earlier 2million triangle version.
![Preview](https://i.imgur.com/r6JeOuI.png)

##### Painting

Basic colors set for the items/body.
![Preview](https://i.imgur.com/Hlzrc8F.png)

UV-unwrapping and painting sub-meshes like teeth and horns separately.
![Preview](https://i.imgur.com/FplTGUp.png)

Painting details.
![Preview](https://i.imgur.com/Ss9RPts.png)

![Preview](https://i.imgur.com/HjAIQQf.png)

![Preview](https://i.imgur.com/IcLDSxB.png)

![Preview](https://i.imgur.com/ThwoUec.png)

##### Animations

Tried to do some animating myself. Not looking too good.
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/kTPtcC4.mp4" type="video/mp4">
  </video>
</dl>

The character was rigged using Blender addon called 'Rigify'. Rigging means setting up the bone structure.
There's a ready made human bone structure that can then be adjusted to the custom 3d model by moving the bones
to correct positions from the front and side perspectives.

Then the character was exported out and inported to mixamo.com for applying the ready made animations, then exported
out and back to blender for weight painting ( which I skipped ) and other adjustments.