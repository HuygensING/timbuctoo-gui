import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Provider, connect} from "react-redux";
import store from "./store";
import actions from "./actions";
import getToken from "./token";

import pageConnector from "./connectors/page-connector";
import Page from "./components/page.jsx";

import firstUploadConnector from "./connectors/first-upload";
import FirstUpload from "./components/firstUpload.js";

import collectionOverviewConnector from "./connectors/collection-overview";
import CollectionOverview from "./components/collection-overview";

import connectArchetypeConnector from "./connectors/connect-to-archetype";
import ConnectToArchetype from "./components/connect-to-archetype";

import connectDataConnector from "./connectors/connect-data";
import ConnectData from "./components/connect-data";

const serializeArchetypeMappings = (collections) => {
  return encodeURIComponent(JSON.stringify(collections));
};


var urls = {
  mapData(vreId, mappings) {
    return vreId && mappings
      ? `/mapdata/${vreId}/${serializeArchetypeMappings(mappings)}`
      : "/mapdata/:vreId/:serializedArchetypeMappings";
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

export default (hasOwnVres) => {
  const indexRoute = hasOwnVres
    ? <IndexRoute component={connectComponent(collectionOverviewConnector)(CollectionOverview)}/>
    : <IndexRoute component={connectComponent(firstUploadConnector)(FirstUpload)}/>;

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={connectComponent(pageConnector)(Page)}>
          {indexRoute}
          <Route onEnter={filterAuthorized("/")}
            path={urls.mapArchetypes()} components={connectComponent(connectArchetypeConnector)(ConnectToArchetype)} />
          <Route onEnter={filterAuthorized("/")}
                 path={urls.mapData()} components={connectComponent(connectDataConnector)(ConnectData)} />

        </Route>
      </Router>
    </Provider>
  );
}
export { urls };