import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import actions from "./actions";
import App from "./components";
import xhr from "xhr";
import xhrmock from "xhr-mock";
import setupMocks from "./servermocks";

if (process.env.NODE_ENV === "development") {
	var orig = window.XMLHttpRequest;
	xhrmock.setup(); //mock window.XMLHttpRequest usages
	var mock = window.XMLHttpRequest;
	window.XMLHttpRequest = orig;
	xhr.XMLHttpRequest = mock;
	xhr.XDomainRequest = mock;
	setupMocks(xhrmock, orig);
}

store.subscribe(() =>
	ReactDOM.render(
		<App
			{...store.getState()}
			{...actions} />,
		document.getElementById("app")
	)
);

function checkTokenInUrl(state) {
	let path = window.location.search.substr(1);
	let params = path.split('&');

	for(let i in params) {
		let [key, value] = params[i].split('=');
		if(key === 'hsid' && !state.userdata.userId) {
			store.dispatch({type: "LOGIN", data: value});
			break;
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	let state = store.getState();
	checkTokenInUrl(state);

	if (!state.archetype || Object.keys(state.archetype).length === 0) {
		xhr("http://acc.repository.huygens.knaw.nl/v2.1/metadata/Admin", (err, resp) => {
			store.dispatch({type: "SET_ARCHETYPE_METADATA", data: JSON.parse(resp.body)});
		});
	}
	ReactDOM.render(
		<App
			{...state}
			{...actions} />,
		document.getElementById("app")
	)
});
