const ROOT_URL = "http://localhost:5000";

const fetchPlaylists = () => {
  return fetch(`${ROOT_URL}/playlists`)
    .then(response => response.json())
    .then(json => json.playlists);
};

const addToPlaylist = (playlistId, videoUrl, title, artist) => {
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

const getVideoTitle = async () => {
  const tab = await getActiveTab();
  const title = tab.title;
  const re = /(.*) - YouTube/;
  const match = re.exec(title);
  if (match) {
    return match[1];
  } else {
    console.warn(`Failed to parse video title from tab title ${title}`);
    return title;
  }
};

const getVideoUrl = async () => {
  const tab = await getActiveTab();
  return tab.url;
};

const getActiveTab = () => {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true }, tabs => {
      resolve(tabs[0]);
    });
  });
};

const navigateToPlaylists = () => {
  renderPlaylists();
};

const navigateToAddSong = async selectedPlaylistId => {
  const title = await getVideoTitle();
  const url = await getVideoUrl();
  renderAddSongForm(selectedPlaylistId, url, title);
};

const renderPlaylists = () => {
  const header = document.querySelector(".header h1");
  header.textContent = "Select a playlist";
  const content = document.querySelector(".content");
  Array.from(content.children).forEach(c => content.removeChild(c));
  fetchPlaylists()
    .then(playlists => {
      playlists.forEach(playlist => {
        const elem = buildPlaylistElement(playlist);
        elem.addEventListener("click", e => navigateToAddSong(e.target.dataset.id));
        content.appendChild(elem);
      });
    });
};

const renderAddSongForm = (playlistId, videoUrl, title = "", artist = "") => {
  const header = document.querySelector(".header h1");
  header.textContent = "Edit song";
  const content = document.querySelector(".content");
  Array.from(content.children).forEach(c => content.removeChild(c));
  const form = buildAddSongFormElement(title, artist)
  content.appendChild(form);
  const buttonContainer = parseHTML(`<div class="action-btn-container"></div>`);
  const addToPlaylistBtn = buildActionButtonElement("Add to playlist");
  const backToPlaylistsBtn = buildActionButtonElement("Back to playlists");

  addToPlaylistBtn.addEventListener("click", () => addToPlaylist(playlistId, videoUrl, title, artist))
  backToPlaylistsBtn.addEventListener("click", navigateToPlaylists);

  buttonContainer.appendChild(addToPlaylistBtn);
  buttonContainer.appendChild(backToPlaylistsBtn);
  content.appendChild(buttonContainer);
};

const buildPlaylistElement = playlist => {
  const html = `<div class="playlist" data-id="${playlist.id}">
                  <h2>${playlist.name}</h2>
                </div>`;
  return parseHTML(html);
};

const buildAddSongFormElement = (title, artist) => {
  const html = `<form>
                  <label>
                    Title 
                    <input type="text" placeholder="Title" value="${title}"/>
                  </label>
                  <label>
                    Artist
                    <input type="text" placeholder="Artist" value="${artist}"/>
                  </label>  
                </form>`;
  return parseHTML(html);
};

const buildActionButtonElement = (text, className) => {
  const html = `<button class="action">
                ${text}
              </button>`;
  return parseHTML(html);
};

const buildSpinnerElement = () => {
  const html = `<div class="spinner">
                  <div class="rect1"></div>
                  <div class="rect2"></div>
                  <div class="rect3"></div>
                  <div class="rect4"></div>
                  <div class="rect5"></div>
               </div>`;
  return parseHTML(html);
};

const parseHTML = htmlString => {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/html").body.firstChild;
};

navigateToPlaylists();