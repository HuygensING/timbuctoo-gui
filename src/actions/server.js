import xhr from "xhr";

export default {
	performXhr: function (options, next) {
		xhr(options, next);
	}
};
