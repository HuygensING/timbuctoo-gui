import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import actions from "./actions";
import {setVre} from "./actions/vre";
import App from "./components/edit-gui/edit-gui";
import getAutocompleteValues from "./actions/autocomplete";

import router from "./router";

const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

document.addEventListener("DOMContentLoaded", () => {

	ReactDOM.render(router, document.getElementById("app"));

	function getVreId() {
		let path = window.location.search.substr(1);
		let params = path.split("&");

		for(let i in params) {
			let [key, value] = params[i].split("=");
			if(key === "vreId") {
				return value;
			}
		}
		return "WomenWriters";
	}

	function getLogin() {
		let path = window.location.search.substr(1);
		let params = path.split("&");

		for(let i in params) {
			let [key, value] = params[i].split("=");
			if(key === "hsid") {
				return {user: value, token: value};
			}
		}
		return undefined;
	}
	store.dispatch(setVre(getVreId()));
	store.dispatch(setUser(getLogin()));
});