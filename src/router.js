import React from "react";
import Search from "./components/faceted-search/faceted-search";
import actions from "./actions";
import {Provider, connect} from "react-redux";
import {Router, Route, browserHistory} from "react-router";
import store from "./store";


// Filters out all search fields and sort fields with values
const grabQuery = (search) => ({
  searchFields: search.query.searchFields.filter((sf) => sf.value && sf.value.length),
  sortFields: search.query.sortFields.filter((sf) => sf.value && sf.value.length)
});

// Serialize search states as json + URI
export function serializeSearch() {
  const { solrSearch } = store.getState();

  return encodeURIComponent(JSON.stringify({
    solrSearch: grabQuery(solrSearch)
  }));
}

// Store search state in url
export function storeSearch() {
  const serialized = `${location.pathname}?#q=${serializeSearch()}`;
  console.log(serialized);
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
  browserHistory.push(urls[key].apply(null, args));
}

// Connector functions
const connectAppComponent = connect(
  (state, routed) => state,
  (dispatch) => actions(navigateTo, dispatch)
);

// Actual routes
export const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={`${urls.root()}`} component={connectAppComponent(Search)}>
      </Route>
    </Router>
  </Provider>
);
