import ReactDOM from "react-dom";
import {routes, storeSearch} from "./router";
import store from "./store";
import searchClient from "./solr-client";
import xhr from "xhr";


xhr({uri: process.env.server + "/v2.1/system/vres"}, (err, resp, body) => store.dispatch({
  type: "RECEIVE_DATASETS",
  datasets: JSON.parse(body)
}));
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(routes, document.getElementById("app"));
  store.subscribe(() => {
    if (location.pathname === "/") {
      storeSearch();
    }
  });

  // Deserialize stores search state on page load
  if (location.hash.length > 0) {
    try {
      const initialSearchState = JSON.parse(decodeURIComponent(location.hash.replace(/^#q=/, "")));
      searchClient.setInitialQuery(initialSearchState.solrSearch || {});
    } catch (e) {
      console.log(e);
    }
  }

  searchClient.initialize();
});
