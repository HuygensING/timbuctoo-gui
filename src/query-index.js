import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import actions from "./actions";
import {setVre} from "./actions/vre";
import { loadSavedQueries } from "./actions/queries";

import App from "./components/query";
import qs from "./util/qs";
document.addEventListener("DOMContentLoaded", () => {


	store.subscribe(() => {
		ReactDOM.render(<App {...store.getState()} {...actions} />, document.getElementById("app"));
	});

	const vreId = qs(window.location.search.substr(1).split("&")).vreId || "WomenWriters";
	store.dispatch(setVre(vreId));
	store.dispatch(loadSavedQueries());
});