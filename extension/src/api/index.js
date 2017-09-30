const ROOT_URL = "http://localhost:5000";

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