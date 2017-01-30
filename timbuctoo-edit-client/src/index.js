import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import {setVre} from "./actions/vre";

import router from "./router";
import xhr from "xhr";

const setUser = (response) => {
	// TODO: validate user session.
	xhr({
		url: `${process.env.TIMBUCTOO_URL}/v2.1/system/users/me/vres`,
		headers: {
			'Authorization': response.token
		}
	}, (err, resp) => {
		if (err || resp.statusCode >= 300) {
			store.dispatch({type: "SESSION_EXPIRED"});
		} else {
			const data = JSON.parse(resp.body);
			if (!data.mine || Object.keys(data.mine).indexOf(getVreId()) < 0) {
				store.dispatch({type: "ERROR_MESSAGE", message: "You are not allowed to edit this vre"});
				store.dispatch({type: "SESSION_EXPIRED"});

			}
		}
	});
	return {
		type: "SET_USER",
		user: response
	};
};

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

document.addEventListener("DOMContentLoaded", () => {

	function initRouter() {
		ReactDOM.render(router, document.getElementById("app"));
	}



	function getLogin() {
		let path = window.location.search.substr(1);
		let params = path.split("&");

		for(let i in params) {
			let [key, value] = params[i].split("=");
			if(key === "hsid") {
				localStorage.setItem("token", JSON.stringify({user: value, token: value}));
				location.href = window.location.href.replace("hsid=" + value, "");
				return;
			}
		}
		return JSON.parse(localStorage.getItem("token") || "null");
	}

	store.dispatch(setVre(getVreId(), initRouter));
	store.dispatch(setUser(getLogin()));
});