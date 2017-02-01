import React from "react";
import store from "./store/store";
import { Router, Route, hashHistory } from "react-router";
import { Provider, connect } from "react-redux";
import App from "./components/app";
import Detail from "./components/faceted-search/detail";
import actions from "./actions";

const urls = {
	root: (vreId) => vreId ? `/?vreId=${vreId}` : "/",
	entity: (collectionName, id, vreId) => collectionName && id && vreId ?
		`/${collectionName}/${id}?vreId=${vreId}` : "/:collectionName/:id"
};

export { urls };

export function navigateTo(key, args) {
	hashHistory.push(urls[key].apply(null, args));
}

const makeContainerComponent = connect((state) => state, (dispatch) => actions(navigateTo, dispatch));

const makeDetailComponent = connect((state, route) => {
	const { solr, metadata: { collections }, metadata } = state;

	const resultIds = solr.searchStates[route.params.collectionName].results.docs.map((doc) => doc.id);
	
	return {
		collectionMetadata: state.metadata.collections[route.params.collectionName],
		entity: state.entity && state.entity.data ? state.entity.data : {},
		params: route.params,
		vreId: state.metadata.vreId,
		nextId: resultIds[resultIds.indexOf(route.params.id) + 1],
		prevId: resultIds[resultIds.indexOf(route.params.id) - 1],
		metadata: metadata.archetypeCollections
	};
}, (dispatch) => actions(navigateTo, dispatch))
const router = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path={urls.root()} component={makeContainerComponent(App)}>
			</Route>
			<Route path={urls.entity()} component={makeDetailComponent(Detail)}>
			</Route>
		</Router>
	</Provider>
);

export default router;