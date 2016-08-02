import React from "react";
import ReactDOM from "react-dom";
import store from "./reducers/store";
import actions from "./actions";
import App from "./components";
import relationTypes from "./relationtypes";
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

function checkTokenInUrl() {
	let path = window.location.search.substr(1);
	let params = path.split('&');

	for(let i in params) {
		let [key, value] = params[i].split('=');
		if(key === 'hsid') {
			store.dispatch({type: "LOGIN", data: value});
			break;
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<p>fetching relation types</p>, document.getElementById("app"));
	checkTokenInUrl();

	store.dispatch({type: "SET_RELATION_TYPES", data: relationTypes});
	xhr("http://acc.repository.huygens.knaw.nl/v2.1/metadata/Admin", (err, resp) => {
		store.dispatch({type: "SET_ARCHETYPE_METADATA", data: JSON.parse(resp.body)});
	});
});
