import xhr from "xhr";
import store from "../store";

export default {
	performXhr: function (options, accept, reject = () => { console.warn("Undefined reject callback! "); }, operation = "Server request") {
		store.dispatch({type: "REQUEST_MESSAGE", message: `${operation}: ${options.method || "GET"} ${options.url}`});
		xhr(options, (err, resp, body) => {
			if(resp.statusCode >= 400) {
				store.dispatch({type: "ERROR_MESSAGE", message: `${operation} failed.`});
				reject(err, resp, body);
			} else if(resp.statusCode == 0 && err != 'null'){
				store.dispatch({type: "ERROR_MESSAGE", message: `${operation} failed.`});
				reject(err, resp, body);
			} else{
				accept(err, resp, body);
			}
		});
	},

	fastXhr: function(options, accept) {
		xhr(options, accept);
	},

	makeHeaders: function(token, vreId) {
		return {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": token,
			"VRE_ID": vreId
		};
	}
};
