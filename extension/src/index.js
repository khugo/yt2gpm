import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { SET_VIDEO_TITLE, SET_VIDEO_URL } from "./reducers";

import { getVideoTitle, getVideoUrl } from "./util";
import App from "./components/App";

const store = createStore(rootReducer);
window.store = store;

getVideoTitle().then(title => store.dispatch({ type: SET_VIDEO_TITLE, payload: title }))
getVideoUrl().then(url => store.dispatch({ type: SET_VIDEO_URL, payload: url }))

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));
