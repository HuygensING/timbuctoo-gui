import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Provider, connect} from "react-redux";
import store from "./store";
import actions from "./actions";
import getToken from "./token";

import pageConnector from "./connectors/page-connector";
import Page from "./components/page.jsx";

import collectionOverviewConnector from "./connectors/collection-overview";
import CollectionOverview from "./components/collection-overview";

import connectArchetypeConnector from "./connectors/connect-to-archetype";
import ConnectToArchetype from "./components/connect-to-archetype";

import connectDataConnector from "./connectors/connect-data";
import ConnectData from "./components/connect-data";

import newDatasetConnector from "./connectors/new-dataset";
import NewDataset from "./components/new-dataset";

var urls = {
  root() {
    return "/";
  },
  newDataset() {
    return "/new-dataset";
  },
  mapData(vreId) {
    return vreId
      ? `/mapdata/${vreId}`
      : "/mapdata/:vreId";
  },
  mapArchetypes(vreId) {
    return vreId ? `/maparchetypes/${vreId}` : "/maparchetypes/:vreId";
  }
};

export function navigateTo(key, args) {
  hashHistory.push(urls[key].apply(null, args));
}

const defaultConnect = connect((state) => state, dispatch => actions(navigateTo, dispatch));

const connectComponent = (stateToProps) => connect(stateToProps, dispatch => actions(navigateTo, dispatch));


const filterAuthorized = (redirectTo) => (nextState, replace) => {
  if (!getToken()) {
    replace(redirectTo);
  }
};

export default (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={connectComponent(pageConnector)(Page)}>
        <IndexRoute component={connectComponent(collectionOverviewConnector)(CollectionOverview)} />
        <Route onEnter={filterAuthorized("/")}
               path={urls.newDataset()} component={connectComponent(newDatasetConnector)(NewDataset)} />
        <Route onEnter={filterAuthorized("/")}
               path={urls.mapArchetypes()} component={connectComponent(connectArchetypeConnector)(ConnectToArchetype)} />
        <Route onEnter={filterAuthorized("/")}
               path={urls.mapData()} component={connectComponent(connectDataConnector)(ConnectData)} />

      </Route>
    </Router>
  </Provider>
);

export { urls };