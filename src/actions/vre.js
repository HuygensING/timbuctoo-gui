import server from "./server";

const listVres = () => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: "/api/v2.1/system/vres"
	}, (err, resp) => {
		dispatch({type: "LIST_VRES", list: JSON.parse(resp.body)});
	}, null, "List VREs");

const setVre = (vreId) => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `/api/v4/system/vres/${vreId}`
	}, (err, resp) => {
		dispatch({type: "SET_VRE", vreId: vreId, collections: JSON.parse(resp.body)});
	}, null, `Fetch VRE description for ${vreId}`);

export {listVres, setVre};
