import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import xhr from "xhr";
import router from "./router";


xhr.get(process.env.server + "/v2.1/javascript-globals", (err, res) => {
  var globals = JSON.parse(res.body);
  store.dispatch({type: "SET_SEARCH_URL", data: globals.env.TIMBUCTOO_SEARCH_URL});
});

xhr.get(process.env.server + "/v2.1/system/vres", (err, resp, body) => {
  store.dispatch({type: "SET_PUBLIC_VRES", payload: JSON.parse(body)});
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    router,
    document.getElementById("app")
  )
});
