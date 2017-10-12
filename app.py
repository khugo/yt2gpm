import json
import os
from functools import update_wrapper
from flask import Flask, request, make_response, current_app
import gpm

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
    body = request.get_json()
    video_url = body["video_url"]
    gpm.download_and_upload_song(video_url, body["metadata"])
    return "OK", 200

def error(message, status_code):
    body = {
        "error": True,
        "status": status_code,
        "message": message
    }
    return json.dumps(body), status_code

if __name__ == "__main__":
    app.run(debug=True)
