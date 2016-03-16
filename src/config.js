export default {
	apiUrl: {
		"v2.1": "http://repository.huygens.knaw.nl/v2.1",
		"v4": typeof location === "undefined" ? "http://localhost:5000" : `http://${location.hostname}:5000`
	},
	apiVersion: "v2.1"
};