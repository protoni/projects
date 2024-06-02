# Spotify CLI

## Description
A tool to control Spotify via the API on command line.

## Github
<https://github.com/protoni/spotify-cli-test/>

## Setup
```powershell
# Note! Spotify premium is required for the API

# Developer account is needed
https://developer.spotify.com/
Create new project, get the client ID and client secret and
save them to credentials.txt

# Create virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install click requests spotipy rich

```

## Usage
```powershell

# Note!
Spotify client needs to be running.
Alternatively to running the Spotify client, a more lightweight spotifyd
could be used

# Login
python .\spotify-cli.py login

# Test Spotify connection
# Ensure that 'Active: ' is true
python .\spotify-cli.py devices

# Search something
python .\spotify-cli.py search Fuel
1. Fuel by Metallica (URI: spotify:track:6FUwPb4mGlUDbx42uspXaZ)
...

# Play a song
python spotify-cli.py play spotify:track:6FUwPb4mGlUDbx42uspXaZ
Playing track: spotify:track:6FUwPb4mGlUDbx42uspXaZ on device ..
Playing Fuel by Metallica ━━╺━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   5%

```

## More commands:
```powershell
python .\spotify-cli.py --help
Usage: spotify-cli.py [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  devices  List available Spotify devices.
  login    Log in to Spotify.
  pause    Pause playback on Spotify.
  play     Play a track on Spotify.
  resume   Resume playback on Spotify.
  search   Search for a track on Spotify.
  volume   Set the volume (0-100) on Spotify.

```


