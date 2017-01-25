import ReactDOM from "react-dom";
import {routes, storeSearch} from "./router";
import store from "./store";
import searchClient from "./solr-client";
import xhr from "xhr";


document.addEventListener("DOMContentLoaded", () => {

  const onReceiveMetadata = (err, resp, body) => {
    store.dispatch({
      type: "RECEIVE_METADATA",
      metadata: JSON.parse(body)
    });

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
  };

  const onReceiveDatasets = (err, resp, body) => {
    store.dispatch({
      type: "RECEIVE_DATASETS",
      datasets: JSON.parse(body)
    });

    xhr({uri: process.env.server + "/v2.1/metadata/Admin?withCollectionInfo=true"}, onReceiveMetadata);
  };

  xhr({uri: process.env.server + "/v2.1/system/vres"}, onReceiveDatasets);

});
