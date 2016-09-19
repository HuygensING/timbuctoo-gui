import React from "react";
import stateToMapDataProps from "./components/react-redux-connect/connect-data";

// import {UploadSplashScreen, ArchetypeMappings, DatasheetMappings, CollectionsOverview} from "./components";

import App from "./components/app.jsx";

import { Router, Route, hashHistory } from 'react-router'
import store from "./store";
import actions from "./actions";
import { Provider, connect } from "react-redux"

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

export function navigateTo(key, args) {
  hashHistory.push(urls[key].apply(null, args));
}

//The current code isn't written with this in mind. I've only added the connect
//function later. Feel free to use your own mapStateToProps for your own
//component
const makeContainerComponent = connect(state => state, dispatch => actions(navigateTo, dispatch));

const makeMapDataContainer = connect(stateToMapDataProps, dispatch => actions(navigateTo, dispatch));

var router = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={makeContainerComponent(App)}/>
      <Route path={urls.collectionsOverview()} component={makeContainerComponent(App)}/>
      <Route path={urls.mapArchetypes()} component={makeContainerComponent(App)}/>
      <Route path={urls.mapData()} component={makeMapDataContainer(App)}/>

    </Router>
  </Provider>
);

export default router;
