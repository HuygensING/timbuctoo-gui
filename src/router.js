import React from "react";

import {UploadSplashScreen, ArchetypeMappings, DatasheetMappings, CollectionsOverview} from "./components";
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

var router = (
  <Provider store={store}>
  	<Router history={hashHistory}>
      <Route path="/" component={makeContainerComponent(UploadSplashScreen)}/>
  		<Route path={urls.mapData()} component={makeContainerComponent(DatasheetMappings)}/>
  		<Route path={urls.mapArchetypes()} component={makeContainerComponent(ArchetypeMappings)}/>
      <Route path={urls.collectionsOverview()} component={makeContainerComponent(CollectionsOverview)}/>
    </Router>
  </Provider>
);

export default router;
