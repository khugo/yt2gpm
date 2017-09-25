chrome.runtime.onMessage.addListener((message, sender, callback) => {
  const sendData = payload => callback({ payload });
  const sendError = error => callback({ error: error.toString() });

  handleMessage(message)
    .then(data => sendData(data))
    .catch(err => sendError(err));
  return true;
});

const handleMessage = message => {
  switch (message.type) {
    case "FETCH_PLAYLISTS":
      return fetchPlaylists();
  }
  return Promise.reject(new Error("Unknown message type"));
};

const ROOT_URL = "http://localhost:5000";

const fetchPlaylists = () => {
  return fetch(`${ROOT_URL}/playlists`)
    .then(response => response.json())
    .then(json => json.playlists);
};