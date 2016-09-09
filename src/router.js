import React from "react";
import store from "./store/store";
import { Router, Route, browserHistory } from "react-router";
import { Provider, connect } from "react-redux";
import App from "./components/app";
import actions from "./actions";

const urls = {
	root: () => "/",
};

export { urls };

export function navigateTo(key, args) {
	browserHistory.push(urls[key].apply(null, args));
}

const makeContainerComponent = connect((state) => state, (dispatch) => actions(navigateTo, dispatch));

const router = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path={urls.root(true)} component={makeContainerComponent(App)}>
			</Route>
		</Router>
	</Provider>
);

export default router;