import React from "react";
import Page from "./components/page";
import actions from "./actions";
import {Provider, connect} from "react-redux";
import {Router, Route, hashHistory} from "react-router";
import store from "./store";


// Filters out all search fields and sort fields with values
const grabQuery = (search) => ({
  searchFields: search.query.searchFields.filter((sf) => sf.value && sf.value.length),
  sortFields: search.query.sortFields.filter((sf) => sf.value && sf.value.length)
});

// Serialize search states as json + URI
export function serializeSearch() {
  const { creatorSearch, legislationSearch, archiveSearch } = store.getState();

  return encodeURIComponent(JSON.stringify({
    creatorSearch: grabQuery(creatorSearch),
    legislationSearch: grabQuery(legislationSearch),
    archiveSearch: grabQuery(archiveSearch)
  }));
}

// Store search state in url
export function storeSearch() {
  const serialized = `${location.pathname}?#q=${serializeSearch()}`;
  if (location.pathname + "#" + location.hash !== serialized) {
    browserHistory.replace(`${location.pathname}#q=${serializeSearch()}`);
  }
}

const urls = {
  root() {
    return "/";
  }
};

export function navigateTo(key, args) {
  hashHistory.push(urls[key].apply(null, args));
}

// Connector functions
const connectAppComponent = connect(
  (state, routed) => state,
  (dispatch) => actions(navigateTo, dispatch)
);

// Actual routes
export const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path={`${urls.root()}`} component={connectAppComponent(Page)}>
      </Route>
    </Router>
  </Provider>
);
