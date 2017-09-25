import json
from flask import Flask, request, make_response
from gmusicapi.clients import Mobileclient
import config
import musicmanager

client = Mobileclient()
success = client.login(config.EMAIL, config.PASSWORD, Mobileclient.FROM_MAC_ADDRESS)
print("Successfully logged in") if success else print("Failed to login")

app = Flask(__name__)

@app.route("/playlists", methods=["GET"])
def get_playlists():
    resp = make_response(json.dumps({"playlists": client.get_all_playlists()}), 200)
    resp.headers["Access-Control-Allow-Origin"] = "*"
    return resp

@app.route("/playlists/<playlist_id>/add", methods=["POST"])
def add_to_playlist(playlist_id):
    payload = request.get_json()
    video_url = payload["video_url"]
    musicmanager.download_and_upload_song(video_url, payload.get("metadata"))
    return "OK", 200

def error(message, status_code):
    body = {
        "error": True,
        "status": status_code,
        "message": message
    }
    return json.dumps(body), status_code
