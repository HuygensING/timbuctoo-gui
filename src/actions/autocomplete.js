import server from "./server";


export default function(path, query, vreId, done) {
	let options = {
		headers: {"Accept": "application/json", "VRE_ID": vreId},
		url: `/api/v2.1/${path}?query=${query}*`
	};

	let xhrDone = function(err, response, body) {
		done(JSON.parse(body).map((d) => { return {key: d.key.replace(/^.+\//, ""), value: d.value}; }));
	};

	server.fastXhr(options, xhrDone);
}