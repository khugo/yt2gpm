const ROOT_URL = "http://localhost:5000";

const fetchPlaylists = () => {
  return fetch(`${ROOT_URL}/playlists`)
    .then(response => response.json())
    .then(json => json.playlists);
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

const navigateToAddSong = async selectedPlaylist => {
  const title = await getVideoTitle();
  const url = await getVideoUrl();
  renderAddSongForm(title);
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
        elem.addEventListener("click", navigateToAddSong);
        content.appendChild(elem);
      });
    });
};

const renderAddSongForm = (title = "", artist = "") => {
  const header = document.querySelector(".header h1");
  header.textContent = "Edit song";
  const content = document.querySelector(".content");
  Array.from(content.children).forEach(c => content.removeChild(c));
  content.appendChild(buildAddSongFormElement(title, artist));
  const buttonContainer = parseHTML(`<div class="action-btn-container"></div>`);
  const addToPlaylistBtn = buildActionButtonElement("Add to playlist");
  const backToPlaylistsBtn = buildActionButtonElement("Back to playlists");

  backToPlaylistsBtn.addEventListener("click", navigateToPlaylists);

  buttonContainer.appendChild(addToPlaylistBtn);
  buttonContainer.appendChild(backToPlaylistsBtn);
  content.appendChild(buttonContainer);
};

const buildPlaylistElement = playlist => {
  const html = `<div class="playlist">
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
}

const parseHTML = htmlString => {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/html").body.firstChild;
};

navigateToPlaylists();