import server from "./server";

let lastRequestTime = 0;
export default function(path, query, done) {
	const options = {
		url: `${process.env.TIMBUCTOO_URL}/v2.1/${path.replace(/^\/v[^/]+\//, "")}?query=${query}*`
	};
	const requestTime = new Date().getTime();
	lastRequestTime = requestTime;

	let xhrDone = function(err, response, body) {
		if (requestTime === lastRequestTime) {
			done(JSON.parse(body).map((d) => {
				return {key: d.key.replace(/^.+\//, ""), value: d.value};
			}));
		}
	};

	server.fastXhr(options, xhrDone);
}