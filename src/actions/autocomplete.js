import server from "./server";

export default function(path, query, done) {
	let options = {
		url: `${process.env.server}/v2.1/${path.replace(/^\/v[^/]+\//, "")}?query=${query}*`
	};

	let xhrDone = function(err, response, body) {
		done(JSON.parse(body).map((d) => { return {key: d.key.replace(/^.+\//, ""), value: d.value}; }));
	};

	server.fastXhr(options, xhrDone);
}