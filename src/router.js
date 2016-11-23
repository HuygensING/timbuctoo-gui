import React from "react";
import {Router, Route, IndexRoute, hashHistory} from "react-router";
import {Provider, connect} from "react-redux";
import store from "./store";
import actions from "./actions";

import pageConnector from "./connectors/page-connector";

import Page from "./components/page.jsx";
import FirstUpload from "./components/firstUpload.js";


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

const defaultConnect = connect((state) => state, dispatch => actions(navigateTo, dispatch));

const connectComponent = (stateToProps) => connect(stateToProps, dispatch => actions(navigateTo, dispatch));

function checkToken() {
  let path = window.location.search.substr(1);
  let params = path.split('&');

  for(let i in params) {
    let [key, value] = params[i].split('=');
    if(key === 'hsid' && !store.getState().userdata.userId) {
      store.dispatch({type: "LOGIN", data: value});
      return true;
    }
  }
  return false;
}

const indexRoute = checkToken()
  ? <IndexRoute component={() => (<span> TODO </span>)}/>
  : <IndexRoute component={defaultConnect(FirstUpload)}/>;

const router = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={connectComponent(pageConnector)(Page)}>
        {indexRoute}
      </Route>
    </Router>
  </Provider>
);

export default router;
export { urls };