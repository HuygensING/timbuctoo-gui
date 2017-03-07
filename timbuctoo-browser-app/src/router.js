import React from "react";
import { Router, Route, hashHistory} from "react-router";
import { Provider, connect } from "react-redux";
import actions from "./actions/actions";
import {getRdfFromUrl} from "./actions/actions";
import App from "./components/app";
import store from "./reducers/store";
import PropValue from './components/PropValue';
import PropValueList from './components/PropertyValueList';

var urls = {
	root() {
		return "/";
	}
};

export function navigateTo(key, args) {
	hashHistory.push(urls[key].apply(null, args));
}

function makeViewModel(state) {
	return {
 		data: state.sample.data,
		url: state.sample.url,
		uploadDatajs: state.sample.uploadDatajs,
		propertyList: state.sample.propertyList,
		errorText: state.sample.errorText,
		isFetching: state.sample.isFetching
	}
}

const connectComponent = connect(makeViewModel, (dispatch) => actions(navigateTo, dispatch));

const router = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path={urls.root()} component={connectComponent(App)} />
		</Router>
	</Provider>
);

var curUrls = {};
hashHistory.listen(function({query}) {
	if (query.url) {
		var newUrls = query.url;
		if (!(newUrls instanceof Array)) {
			newUrls = [newUrls];
		}
		if (Object.keys(curUrls).length != newUrls.length || !newUrls.every(url => curUrls.hasOwnProperty(url))) {
			curUrls = newUrls.reduce(function (agg, cur) { agg[cur] = true; return agg}, {});
			getRdfFromUrl(newUrls, store.dispatch.bind(store));
		}
	}	
});

export default router;