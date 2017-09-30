import uuid
from . import config
import os
import errno
import time
import youtube_dl
from gmusicapi.clients import Mobileclient

client = Mobileclient()
success = client.login(config.EMAIL, config.PASSWORD,
                       Mobileclient.FROM_MAC_ADDRESS)
print("Successfully logged in") if success else print("Failed to login")

def download_and_upload_song(youtube_url, metadata = {}):
    print(youtube_url)
    song_path = download_song(youtube_url, metadata)
    filename = os.path.basename(song_path)
    new_path = os.path.join(config.MUSIC_MANAGER_FOLDER, filename)
    try:
        os.makedirs(config.MUSIC_MANAGER_FOLDER)
    except OSError as e:
        if e.errno != errno.EEXIST:
            raise
    print("Moving file to {}".format(new_path))
    os.rename(song_path, new_path)

def download_song(youtube_url, metadata):
    file_id = uuid.uuid4()
    filename = "./tmp/{}.%(ext)s".format(file_id)
    dl_opts = {
        "format": "bestaudio",
        "outtmpl": filename,
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192"
            },
            {
                "key": "FFmpegMetadata",
                "metadata": {
                    "title": metadata["title"],
                    "artist": metadata["artist"]
                }
            }
        ]
    }
    print("Downloading song {}".format(youtube_url))
    with youtube_dl.YoutubeDL(dl_opts) as ydl:
        ydl.download([youtube_url])
    return "./tmp/{}.mp3".format(file_id)

def poll_for_song(title, artist):
    attempts = 0
    max_attempts = 10
    song = find_song_from_library(title, artist)
    while song is None:
        if attempts > max_attempts:
            raise Exception("Failed to find uploaded song from library")
        time.sleep(1)
        attempts = attempts + 1
        song = find_song_from_library
    return song


def find_song_from_library(title, artist):
    print("Checking if songs exists {} - {}".format(title, artist))
    songs = client.get_all_songs()
    matching = [s for s in songs if s["title"] == title and s["artist"] == artist]
    return matching[0] if len(matching) > 0 else None

def add_song_to_playlist(playlist_id, song):
    client.add_songs_to_playlist(playlist_id, song["id"])
