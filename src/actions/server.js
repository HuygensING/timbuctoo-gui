import xhr from "xhr";

export default {
	performXhr: function (options, next) {
		xhr(options, next);
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
