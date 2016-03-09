import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import actions from "./actions";
import {setVre} from "./actions/vre";
import { loadSavedQueries } from "./actions/queries";

import App from "./components/query";

document.addEventListener("DOMContentLoaded", () => {


	store.subscribe(() => {
		ReactDOM.render(<App {...store.getState()} {...actions} />, document.getElementById("app"));
	});


	store.dispatch(setVre("WomenWriters"));
	store.dispatch(loadSavedQueries());
});