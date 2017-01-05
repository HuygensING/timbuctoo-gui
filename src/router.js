import React from "react";
import {Router, Redirect, Route, hashHistory} from "react-router";
import {Provider, connect} from "react-redux";
import store from "./store";
import getAutocompleteValues from "./actions/autocomplete";
import actions from "./actions";

import EditGui from "./components/edit-gui/edit-gui";
import {urls} from "./urls";




export function navigateTo(key, args) {
	hashHistory.push(urls[key].apply(null, args));
}

const defaultConnect = connect(
	state => ({...state, getAutocompleteValues: getAutocompleteValues}),
	dispatch => actions(navigateTo, dispatch)
);


export default (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path={urls.root()} components={defaultConnect(EditGui)} />
			<Route path={urls.firstEntity()} components={defaultConnect(EditGui)} />
			<Route path={urls.newEntity()} components={defaultConnect(EditGui)} />
			<Route path={urls.entity()} components={defaultConnect(EditGui)} />
		</Router>
	</Provider>
);

