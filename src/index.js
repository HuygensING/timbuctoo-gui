import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import xhr from "xhr";
import router from "./router";
import getToken from "./token"
import {fetchMyVres} from "./actions/fetch-my-vres";

xhr.get(process.env.server + "/v2.1/javascript-globals", (err, res) => {
  var globals = JSON.parse(res.body);
  store.dispatch({type: "SET_SEARCH_URL", data: globals.env.TIMBUCTOO_SEARCH_URL});
});

xhr.get(process.env.server + "/v2.1/system/vres", (err, resp, body) => {
  store.dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
});

const initialRender = (hasOwnVres) => ReactDOM.render(router(hasOwnVres), document.getElementById("app"));

document.addEventListener("DOMContentLoaded", () => {

  xhr(process.env.server + "/v2.1/metadata/Admin", (err, resp) => {

    store.dispatch({type: "SET_ARCHETYPE_METADATA", data: JSON.parse(resp.body)});
    const token = getToken();
    if (token) {
      store.dispatch(fetchMyVres(token, (vreData) => initialRender(vreData.mine)));
/*
      xhr(process.env.server + "/v2.1/system/users/me/vres", {
        headers: {
          "Authorization": token
        }
      }, (err, resp, body) => {
        const vreData = JSON.parse(body);
        store.dispatch({type: "LOGIN", data: token, vreData: vreData});

        initialRender(vreData.mine);
      });
*/
    } else {
      initialRender(false);
    }
  });

});
