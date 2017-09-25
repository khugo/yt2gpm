const insertAddButton = () => {
  const addBtn = createAddButton();
  if (!addBtn) {
    // Description hasn't loaded yet, wait
    return setTimeout(insertAddButton, 100);
  }
  addBtn.addEventListener("click", showAddToPlaylistMenu);
};

const showAddToPlaylistMenu = () => {
  const html = `<div class="yt2gpm menu">Text</div>`;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/xml");
  const app = document.querySelector("body");
  app.appendChild(doc.firstChild);
};

const createAddButton = () => {
  const ytAddBtn = document.querySelector(`button[aria-label="Add to"]`);
  if (!ytAddBtn) return;
  // Deep clone doesn't work for some reason, clone manually and append
  const childClone = ytAddBtn.parentNode.cloneNode(true);
  const parentClone = ytAddBtn.parentNode.parentNode.cloneNode(true);
  parentClone.appendChild(childClone);
  parentClone.title = "Add to Google Play Music";

  const btnRow = ytAddBtn.parentNode.parentNode.parentNode;
  btnRow.appendChild(parentClone);
  return parentClone;
};

let playlistCache = [];
const fetchPlaylists = () => {
  if (playlistCache.length > 0) return Promise.resolve(playlistCache);
  return sendMessage("FETCH_PLAYLISTS")
    .then(playlists => {
      playlistCache = playlists;
      return playlists;
    });
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

insertAddButton();