import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

import App from "./components/App.jsx";

const store = createStore(rootReducer);
window.store = store;

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));
