# Audio visualizer

## Description
I've been lately experimenting with audio stuff, mainly visualizing audio data
with ascii here:
<https://protoni.fi/Experiments/ascii-audio-visualizer/>

It's a bit clunky, so I decided to do a proper web based tool. I also put it in 
git pages so it can be used here:
<https://protoni.github.io/audio-visualizer-web/>

## Github
<https://github.com/protoni/audio-visualizer-web/>

## Testing

Here's some clips

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/8XyGybG.mp4" type="video/mp4">
  </video>
</dl>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/QCoEhpM.mp4" type="video/mp4">
  </video>
</dl>

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/0ZuVrjd.mp4" type="video/mp4">
  </video>
</dl>

0 Hz -> 20 KHz audio sweep

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/TqTl0LP.mp4" type="video/mp4">
  </video>
</dl>



## Setup for Github pages
It's pure html/css/js page, so it can be used by simply opening the .html locally,
but I decied to just host it with Github pages
```powershell
# Add the .html and .js to a GitHub repo and publish:
Repo -> Settings -> Pages -> Deploy from a branch
Branch -> main -> / (root)

# Access the tool
https://protoni.github.io/audio-visualizer-web/
```

## Controls
I put some control in there because some songs/audio and audio devices output varying
data, so they can be adjusted here. Basically there's a scalar value for amplitude/
how much the height varies ( sensitivity buttons ).

And also just to increase/decrease the
bar height statically ( height buttons ), this will just + or - the bar height.

![buttons](https://i.imgur.com/6u9iF1R.png)

There's all kinds of variables to adjust that could potentially be but in a settings menu.
Like the resolution of the graph and the spectrum width ( Hz ).

## Links
<https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createAnalyser>
