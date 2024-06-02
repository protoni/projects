# Audio visualizer

## Description
CLI Tools to test different methods of reading audio devices and visualizing the data.

Testing horizontal spectrum view
![desc1](https://i.imgur.com/BsbFHzl.png)

Testing vertical spectrum view
![desc2](https://i.imgur.com/7RxKAuH.png)

The amplitude needs some work currently. Probably needs some scalar that doesn't scale
linearly. Currently with low volume the graph is barely noticeable and
if I amplify it, then the graph will overflow the window on high volume. 

I had a plan to clean these experiment scripts and create a separate project for a
custom CLI spotify frontend so I'll probably fine tune the graph there.

## Github
<https://github.com/protoni/audio-visualizer/>

## Testing

Below there is a proper audio spectrum analyzer, see references section
<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/dHq78hM.mp4" type="video/mp4">
  </video>
</dl>


<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/JHLnfbt.mp4" type="video/mp4">
  </video>
</dl>

There's also another view where the frequency bar is at the bottom, but it keeps
flickering when the screen clears so I just reversed the bytes and put the whole
graph upside down.

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/K4idcZp.mp4" type="video/mp4">
  </video>
</dl>

##### Audio sweep

I found this audio sweep video on youtube and ran it:
<https://www.youtube.com/watch?v=PAsMlDptjx8>
Removed audio because it hurts ears. Also the graph seems pretty weird because
it keeps growing towards the end and at lower frequencies it's unnoticeable.
Also the graph currently overflows the screen

<dl>
  <video width="1024" height="480" controls>
    <source src="https://i.imgur.com/sODd1Cz.mp4" type="video/mp4">
  </video>
</dl>

## Setup
```powershell
# Create virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install numpy pyaudio scipy sounddevice asciimatics
```

##### CLI ASCII
```powershell
# Run horizontal CLI ASCII spectrum analyzer
python .\ascii_horizontal.py

# Run vertical CLI ASCII spectrum analyzer
python .\ascii_vertical.py
```

##### Other python scripts
```powershell
# Run different visualizers experiments
python .\visualizer.py
python .\visualizer_pyaudio.py
python .\visualizer_sounddevice.py
python .\visualizer_sounddevice2.py

# Run rust based visualizer
cd audio-visualizer-rust
cargo run
```

##### Rust
```powershell
# Run rust based visualizer
cd audio-visualizer-rust
cargo run
```

## References
<https://github.com/tyiannak/paura>

<https://github.com/aiXander/Realtime_PyAudio_FFT>
