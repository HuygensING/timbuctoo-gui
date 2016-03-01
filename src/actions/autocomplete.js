import server from "./server";
import config from "../config";

export default function(path, query, vreId, done) {
	let options = {
		headers: {"Accept": "application/json", "VRE_ID": vreId},
		url: `${config.apiUrl[config.apiVersion]}/${path.replace(/^\/v[^/]+\//, "")}?query=${query}*`
	};

	let xhrDone = function(err, response, body) {
		done(JSON.parse(body).map((d) => { return {key: d.key.replace(/^.+\//, ""), value: d.value}; }));
	};

	server.fastXhr(options, xhrDone);
}