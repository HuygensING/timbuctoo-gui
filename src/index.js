import ReactDOM from "react-dom";
import {routes, storeSearch} from "./router";
import store from "./store";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(routes, document.getElementById("app"));
  store.subscribe(() => {
    if (location.pathname === "/") {
      // storeSearch();
    }
  });

  // Deserialize stores search state on page load
  if (location.hash.length > 0) {
    try {
      // const initialSearchState = JSON.parse(decodeURIComponent(location.hash.replace(/^#q=/, "")));
      // searchClient.setInitialQuery(initialSearchState.solrSearch || {});
    } catch (e) {
      console.log(e);
    }
  }

//  searchClient.initialize();
});
