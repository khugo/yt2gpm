import youtube_dl
import uuid

def download_and_upload_song(youtube_url):
    tmp_filepath = download_song(youtube_url)


def download_song(youtube_url):
    filename = "./downloads/{}.%(ext)s".format(uuid.uuid4())
    dl_opts = {
        "format": "bestaudio",
        "outtmpl": filename,
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192"
            }
        ],
        "metadata": "artist=test"
    }
    print("Downloading song {}".format(youtube_url))
    with youtube_dl.YoutubeDL(dl_opts) as ydl:
        ydl.download([youtube_url])
    return filename
