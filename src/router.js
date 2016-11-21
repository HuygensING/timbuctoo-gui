import React from "react";
import Search from "./components/faceted-search/faceted-search";
import Detail from "./components/faceted-search/detail";
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
  if (location.pathname + "#" + location.hash !== serialized) {
    browserHistory.replace(`${location.pathname}#q=${serializeSearch()}`);
  }
}

const urls = {
  root: () => "/",
  entity: (dataset, path) => dataset && path ?
    `/${dataset}/${path}` : "/:dataset/:collectionName/:id"
};

export { urls };

export function navigateTo(key, args) {
  browserHistory.push(urls[key].apply(null, args));
}

// Connector functions
const connectAppComponent = connect(
  (state, routed) => state,
  (dispatch) => actions(navigateTo, dispatch)
);

const connectDetailComponent = connect(
  (state, routed) => {
    const pageIdx = state.pagination.idMap[`${routed.params.collectionName}/${routed.params.id}`];

    return  {
      entity: state.entity && state.entity.data ? state.entity.data : {},
      nextPage: typeof pageIdx !== "undefined" && pageIdx < state.pagination.pages.length ?
        state.pagination.pages[pageIdx + 1] : null,
      prevPage: typeof pageIdx !== "undefined" && pageIdx > 0 ?
        state.pagination.pages[pageIdx - 1] : null,
    };
  }, (dispatch) => actions(navigateTo, dispatch)

);

// Actual routes
export const routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={`${urls.root()}`} component={connectAppComponent(Search)}>
      </Route>
      <Route path={urls.entity()} component={connectDetailComponent(Detail)}>
      </Route>
    </Router>
  </Provider>
);
