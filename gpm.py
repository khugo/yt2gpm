import uuid
import config
import os
import errno
import time
import youtube_dl
from gmusicapi.clients import Mobileclient, Musicmanager
from gmusicapi.protocol import musicmanager
from oauth2client.client import OAuth2WebServerFlow, TokenRevokeError

class Client:
    def __init__(self):
        self.api_client = self.create_api_client()
        self.music_manager = self.create_music_manager()

    def create_api_client(self):
        client = Mobileclient()
        success = client.login(config.EMAIL, config.PASSWORD,
                               Mobileclient.FROM_MAC_ADDRESS)
        if not success:
            raise Exception("Failed to login API client")
        print("Logged in API client")
        return client

    def create_music_manager(self):
        music_manager = Musicmanager()
        success = music_manager.login(oauth_credentials=config.OAUTH_CREDENTIAL_PATH)
        if not success:
            raise Exception("Failed to login music manager")
        print("Logged in music manager")
        return music_manager

    def download_and_upload_song(self, youtube_url, metadata = {}):
        print(youtube_url)
        song_path = self.download_song(youtube_url, metadata)
        uploaded, _, not_uploaded = self.music_manager.upload(song_path)
        if not_uploaded:
            raise Exception("Song upload failed: {}".format(list(not_uploaded.values())[0]))
        song_id = list(uploaded.values())[0]
        return song_id

    def download_song(self, youtube_url, metadata):
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

    def add_song_to_playlist(self, playlist_id, song_id):
        print("Adding song {} to playlist {}".format(playlist_id, song_id))
        self.api_client.add_songs_to_playlist(playlist_id, song_id)

    def get_playlists(self):
        return self.api_client.get_all_playlists()

def get_oauth_flow():
    return OAuth2WebServerFlow(*musicmanager.oauth)

def do_credentials_exist():
    return os.path.isfile(config.OAUTH_CREDENTIAL_PATH)
