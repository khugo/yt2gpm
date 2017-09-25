const fetchPlaylists = () => {
  return sendMessage("FETCH_PLAYLISTS");
};

const sendMessage = (type, payload) => {
  console.log("[Send]", type, payload);
  return new Promise((resolve, reject) => {
    chrome.extension.sendMessage({ type, payload }, response => {
      console.log("[Receive]", response);
      if (!response) return reject(new Error("Received empty response from background script"));
      if (response.error) return reject(new Error(response.error));
      resolve(response.payload);
    });
  });
};
fetchPlaylists();