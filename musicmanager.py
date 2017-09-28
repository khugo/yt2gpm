import uuid
import config
import os
import errno
import youtube_dl

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
