const ROOT_URL = "http://localhost:5000";

const fetchPlaylists = () => {
  return fetch(`${ROOT_URL}/playlists`)
    .then(response => response.json())
    .then(json => json.playlists);
};

const navigateToPlaylists = () => {
  renderPlaylists();
};

const navigateToAddSong = selectedPlaylist => {
  renderAddSongForm();
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

const renderAddSongForm = () => {
  const header = document.querySelector(".header h1");
  header.textContent = "Edit song";
  const content = document.querySelector(".content");
  Array.from(content.children).forEach(c => content.removeChild(c));
  content.appendChild(buildAddSongFormElement());
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

const buildAddSongFormElement = () => {
  const html = `<form>
                  <input type="text" placeholder="Artist"/>
                  <input type="text" placeholder="Title"/>
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