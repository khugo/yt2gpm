import { combineReducers } from "redux";

export const SET_VIDEO_URL = "SET_VIDEO_URL";
export const SET_VIDEO_TITLE = "SET_VIDEO_TITLE";
export const SET_VIDEO_ARTIST = "SET_VIDEO_ARTIST";

export const NAVIGATE_TO = "NAVIGATE_TO";
export const SELECT_PLAYLIST = "SELECT_PLAYLIST";

export const FETCH_PLAYLISTS = "FETCH_PLAYLISTS";
export const FETCH_PLAYLISTS_SUCCESS = "FETCH_PLAYLISTS_SUCCESS";
export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLIST";
export const ADD_TO_PLAYLIST_SUCCESS = "ADD_TO_PLAYLIST_SUCCESS";
export const ADD_TO_PLAYLIST_ERROR = "ADD_TO_PLAYLIST_ERROR";

const navigation = (state = "playlists", action) => {
  console.log(action);
  switch (action.type) {
    case NAVIGATE_TO:
      return action.payload;
  }
  return state;
};

const playlists = (state = [{ id: "1", name: "Test" }], action) => {
  return state;
}

const selectedPlaylist = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PLAYLIST:
      return action.payload;
  }
  return state;
};

const loading = (state = false, action) => {
  switch (action.type) {
    case ADD_TO_PLAYLIST:
    case FETCH_PLAYLISTS:
      return true;
    case ADD_TO_PLAYLIST_SUCCESS:
    case ADD_TO_PLAYLIST_ERROR:
    case FETCH_PLAYLISTS_SUCCESS:
      return false;
  }
  return state;
};

const url = (state = "", action) => {
  switch (action.type) {
    case SET_VIDEO_URL:
      return action.payload;
  }
  return state;
};

const title = (state = "", action) => {
  switch (action.type) {
    case SET_VIDEO_TITLE:
      return action.payload;
  }
  return state;
};

const artist = (state = "", action) => {
  switch (action.type) {
    case SET_VIDEO_ARTIST:
      return action.payload;
  }
  return state;
};

export default combineReducers({
  navigation,
  playlists,
  selectedPlaylist,
  loading,
  url,
  title,
  artist
});