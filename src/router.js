import React from "react";
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { Provider, connect } from "react-redux"
import store from "./store";
import actions from "./actions";

import stateToMapDataProps from "./components/react-redux-connect/connect-data";
import stateToPageProps from "./components/react-redux-connect/page";
import stateToFirstUploadProps from "./components/react-redux-connect/first-upload";
import stateToCollectionOverview from "./components/react-redux-connect/collection-overview";
import stateToMapArchetypes from "./components/react-redux-connect/connect-to-archetype";

import FirstUpload from "./components/firstUpload.jsx";
import Page from "./components/page.jsx";
import CollectionOverview from "./components/collection-overview";
import ConnectToArchetype from "./components/connect-to-archetype";
import ConnectData from "./components/connect-data";


var urls = {
  mapData() {
    return "/mapdata";
  },
  mapArchetypes() {
    return "/maparchetypes";
  },
  collectionsOverview() {
    return "/collections-overview";
  }
};

const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false })

export function navigateTo(key, args) {
  hashHistory.push(urls[key].apply(null, args));
}

const connectComponent = (stateToProps) => connect(stateToProps, dispatch => actions(navigateTo, dispatch));

const router = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={connectComponent(stateToPageProps)(Page)}>
        <IndexRoute component={connectComponent(stateToFirstUploadProps)(FirstUpload)}/>
        <Route path={urls.collectionsOverview()} components={connectComponent(stateToCollectionOverview)(CollectionOverview)} />
        <Route path={urls.mapArchetypes()} components={connectComponent(stateToMapArchetypes)(ConnectToArchetype)} />
        <Route path={urls.mapData()} components={connectComponent(stateToMapDataProps)(ConnectData)} />
      </Route>
    </Router>
  </Provider>
);

export default router;
export { urls };