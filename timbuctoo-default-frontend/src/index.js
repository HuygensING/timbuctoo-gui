import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import xhr from "xhr";
import router from "./router";
import getToken from "./token"
import {fetchMyVres} from "./actions/fetch-my-vres";

import xhrmock from "xhr-mock";
import setupMocks from "./servermocks";

if (process.env.USE_MOCK === "true") {
  console.log("Using mock server!")
  var orig = window.XMLHttpRequest;
  xhrmock.setup(); //mock window.XMLHttpRequest usages
  var mock = window.XMLHttpRequest;
  window.XMLHttpRequest = mock;
  xhr.XMLHttpRequest = mock;
  xhr.XDomainRequest = mock;
  setupMocks(xhrmock, orig);
}

store.dispatch({ type: "SET_SEARCH_URL", data: process.env.TIMBUCTOO_SEARCH_GUI_URL });

xhr.get(process.env.TIMBUCTOO_URL + "/v2.1/system/vres", (err, resp, body) => {
  store.dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
});

const initialRender = () => ReactDOM.render(router, document.getElementById("app"));

const initialize = (token = null) => {
  if (token) {
    xhr.get({
      url: process.env.TIMBUCTOO_URL + "/v2.1/system/users/me",
      headers: {
        'Authorization': token
      }
    }, (err, resp, body) => {
      try {
        const userData = JSON.parse(body);
        store.dispatch({type: "SET_USER_DATA", userData: userData})
      } catch (e) {
        console.log(e);
      }
    });
  }
  initialRender();
};

document.addEventListener("DOMContentLoaded", () => {

  xhr(process.env.TIMBUCTOO_URL + "/v2.1/metadata/Admin?withCollectionInfo=true", (err, resp) => {

    store.dispatch({type: "SET_ARCHETYPE_METADATA", data: JSON.parse(resp.body)});
    const token = getToken();
    if (token) {
      store.dispatch(fetchMyVres(token, () => initialize(token), () => {
        localStorage.removeItem("token");
        location.href = location.href.replace(/\?.*$/, "");
      }));
    } else if (token !== undefined) {
      initialize();
    }
  });
});

let comboMap = {
  ctrl: false,
  shift: false,
  f4: false
};

const keyMap = {
  17: "ctrl",
  16: "shift",
  115: "f4"
};

document.addEventListener("keydown", (ev) => {
  if (keyMap[ev.keyCode]) {
    comboMap[keyMap[ev.keyCode]] = true;
  }

  if (Object.keys(comboMap).map(k => comboMap[k]).filter(isPressed => isPressed).length === 3) {
    store.dispatch({type: "PREVIEW_RML"});
  }

  if (ev.keyCode === 27) {
    store.dispatch({type: "HIDE_RML_PREVIEW"});
  }
});

document.addEventListener("keyup", (ev) => {
  if (keyMap[ev.keyCode]) {
    comboMap[keyMap[ev.keyCode]] = false;
  }
});