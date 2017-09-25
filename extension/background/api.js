chrome.runtime.onMessage.addListener((message, sender, callback) => {
  const sendData = payload => callback({ payload });
  const sendError = error => callback({ error });

  switch (message.type) {
    case "FETCH_PLAYLISTS":
      fetchPlaylists()
        .then(playlists => sendData(playlists))
        .catch(e => sendError(e));
      break;
  }
  return true;
});

const ROOT_URL = "http://localhost:5000";

const fetchPlaylists = () => {
  return fetch(`${ROOT_URL}/playlists`)
    .then(response => response.json())
    .then(json => json.playlists);
};

const request = (url, method = "GET", body = {}) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.addEventListener("load", function () {
      resolve(JSON.parse(this.responseText));
    });
    req.open(method, url);
    req.send();
  });
};