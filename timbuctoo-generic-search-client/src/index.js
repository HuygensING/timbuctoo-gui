import ReactDOM from "react-dom";
import store from "./store/store";
import {setVre} from "./actions/metadata";
import {checkIndex} from "./actions/solr";
import router from "./router";

function getVreId() {
	let path = window.location.search.substr(1);
	let params = path.split("&");

	for(let i in params) {
		let [key, value] = params[i].split("=");
		if(key === "vreId") {
			return value;
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	store.dispatch(setVre(getVreId(), function checkForIndex() {
		store.dispatch(checkIndex(function afterInit() {
			//you should render when all solr info has been retrieved
			ReactDOM.render(router, document.getElementById("app"));
		}))
	}));
});