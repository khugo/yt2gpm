import json
import os
from functools import update_wrapper
from flask import Flask, request, make_response, current_app, redirect, send_file
import oauth2client
import gpm
import config

app = Flask(__name__)

GPM = None

def get_client():
    global GPM
    if not GPM:
        if gpm.do_credentials_exist():
            print("Credentials exist, creating GPM client")
            app.logger.info("Credentials exist, creating GPM client")
            GPM = gpm.Client()
        else:
            raise Exception("Credentials don't exist")
    return GPM

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
    gpm_client = get_client()
    return json.dumps({"playlists": gpm_client.get_playlists()}), 200

@app.route("/playlists/<playlist_id>/add", methods=["POST", "OPTIONS"])
@crossdomain()
def add_to_playlist(playlist_id):
    body = request.get_json()
    video_url = body["video_url"]
    gpm_client = get_client()
    song_id = gpm_client.download_and_upload_song(video_url, body["metadata"])
    gpm_client.add_song_to_playlist(playlist_id, song_id)
    return "OK", 200

@app.route("/download", methods=["POST"])
@crossdomain()
def download():
    body = request.get_json()
    video_url = body["video_url"]
    filepath = os.path.join(app.root_path, gpm.download_song(video_url, body["metadata"]))
    resp = send_file(filepath)
    resp.headers["Content-Type"] = "audio/mp3"
    return resp

@app.route("/auth", methods=["GET"])
def authenticate_music_manager():
    flow = gpm.get_oauth_flow()
    return redirect(flow.step1_get_authorize_url())

@app.route("/auth/exchange", methods=["POST"])
@crossdomain()
def exchange_oauth_token():
    token = request.get_json()["token"]
    flow = gpm.get_oauth_flow()
    credentials = flow.step2_exchange(token)
    storage = oauth2client.file.Storage(config.OAUTH_CREDENTIAL_PATH)
    storage.put(credentials)
    app.logger.info("Wrote credentials to {}".format(config.OAUTH_CREDENTIAL_PATH))
    return "OK", 200

def error(message, status_code):
    body = {
        "error": True,
        "status": status_code,
        "message": message
    }
    return json.dumps(body), status_code

if __name__ == "__main__":
    app.run(debug=True, host=os.environ.get("HOST", "127.0.0.1"))
