import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import actions from "./actions";
import {listVres} from "./actions/vre";
import App from "./components/edit";

document.addEventListener("DOMContentLoaded", () => {


	store.subscribe(() =>
		ReactDOM.render(<App {...store.getState()} {...actions} />, document.getElementById("app"))
	);

	store.dispatch(listVres());

});