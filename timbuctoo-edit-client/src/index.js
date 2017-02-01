import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import {setVre} from "./actions/vre";

import router from "./router";
import xhr from "xhr";

const setUser = (user) => {
	// TODO: validate user session.
	if (user) {
		xhr({
			url: `${process.env.TIMBUCTOO_URL}/v2.1/system/users/me/vres`,
			headers: {
				'Authorization': user.token
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

		xhr({
			url: `${process.env.server}/v2.1/system/users/me`,
			headers: {
				'Authorization': user.token
			}
		}, (err, resp) => {
			try {
				const userData = JSON.parse(resp.body);
				store.dispatch({type: "SET_USER_DATA", userData: userData});
			} catch (e) {
				console.warn(e);
			}
		});
	}

	return {
		type: "SET_USER",
		user: user
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