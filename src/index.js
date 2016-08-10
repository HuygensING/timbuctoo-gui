import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import xhr from "xhr";
import xhrmock from "xhr-mock";
import setupMocks from "./servermocks";
import router from "./router";
import actionsMaker from "./actions";
import { navigateTo } from "./router";


if (process.env.USE_MOCK === "true") {
	console.log("Using mock server!")
	var orig = window.XMLHttpRequest;
	xhrmock.setup(); //mock window.XMLHttpRequest usages
	var mock = window.XMLHttpRequest;
	window.XMLHttpRequest = orig;
	xhr.XMLHttpRequest = mock;
	xhr.XDomainRequest = mock;
	setupMocks(xhrmock, orig);
}
let actions = actionsMaker(navigateTo, store.dispatch.bind(store));

function checkTokenInUrl(state) {
	let path = window.location.search.substr(1);
	let params = path.split('&');

	for(let i in params) {
		let [key, value] = params[i].split('=');
		if(key === 'hsid' && !state.userdata.userId) {
			actions.onToken(value);


			break;
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	let state = store.getState();
	checkTokenInUrl(state);
	if (!state.archetype || Object.keys(state.archetype).length === 0) {
		xhr(process.env.server + "/v2.1/metadata/Admin", (err, resp) => {
			store.dispatch({type: "SET_ARCHETYPE_METADATA", data: JSON.parse(resp.body)});
		});
	}
	ReactDOM.render(
		router,
		document.getElementById("app")
	)
});
