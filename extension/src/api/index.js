export const ROOT_URL = "http://yt2gpm.herokuapp.com";

export const addToPlaylist = (playlistId, videoUrl, title, artist) => {
  const opts = {
    method: "POST",
    body: JSON.stringify({
      video_url: videoUrl,
      metadata: {
        title: title,
        artist: artist
      }
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };
  return fetch(`${ROOT_URL}/playlists/${playlistId}/add`, opts);
};

export const fetchPlaylists = () => {
  return fetch(`${ROOT_URL}/playlists`)
    .then(response => response.json())
    .then(json => json.playlists);
};

export const startDownloadingSong = (videoUrl, title, artist) => {
  const opts = {
    method: "POST",
    body: JSON.stringify({
      video_url: videoUrl,
      metadata: {
        title: title,
        artist: artist
      }
    }),
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    redirect: "manual"
  };
  return fetch(`${ROOT_URL}/download`, opts)
    .then(res => res.text());
};