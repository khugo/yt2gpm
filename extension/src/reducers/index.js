import { combineReducers } from "redux";

export const NAVIGATE_TO = "NAVIGATE_TO";

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

export default combineReducers({
  navigation,
  playlists
});