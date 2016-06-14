import React from "react";
import ReactDOM from "react-dom";
import store from "./reducers/store";
import actions from "./actions";
import App from "./components";
import relationTypes from "./relationtypes";
import xhr from "xhr";


store.subscribe(() =>
	ReactDOM.render(<App {...store.getState()} {...actions} />, document.getElementById("app"))
);

document.addEventListener("DOMContentLoaded", () => {
	ReactDOM.render(<p>fetching relation types</p>, document.getElementById("app"));

	store.dispatch({type: "SET_RELATION_TYPES", data: relationTypes});
	xhr("http://test.repository.huygens.knaw.nl/v2.1/metadata/Admin", (err, resp) => {
		store.dispatch({type: "SET_ARCHETYPE_METADATA", data: JSON.parse(resp.body)});
	});
});