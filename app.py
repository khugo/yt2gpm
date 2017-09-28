import json
from functools import update_wrapper
from flask import Flask, request, make_response, current_app
from gmusicapi.clients import Mobileclient
import config
import musicmanager

client = Mobileclient()
success = client.login(config.EMAIL, config.PASSWORD, Mobileclient.FROM_MAC_ADDRESS)
print("Successfully logged in") if success else print("Failed to login")

app = Flask(__name__)


def crossdomain(origin="*"):
    def get_methods():
        resp = current_app.make_default_options_response()
        return resp.headers["allow"]

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if request.method == "OPTIONS":
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            resp.headers["Access-Control-Allow-Origin"] = origin
            resp.headers["Access-Control-Allow-Methods"] = get_methods()
            resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
            resp.headers["Access-Control-Max-Age"] = 21600
            return resp
        return update_wrapper(wrapped_function, f)
    return decorator

@app.route("/playlists", methods=["GET"])
@crossdomain()
def get_playlists():
    return json.dumps({"playlists": client.get_all_playlists()}), 200

@app.route("/playlists/<playlist_id>/add", methods=["POST", "OPTIONS"])
@crossdomain()
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
