import server from "./server";
import config from "../config";

const listVres = () => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `//acc.repository.huygens.knaw.nl/system/vres`
	}, (err, resp) => {
		dispatch({type: "LIST_VRES", list: JSON.parse(resp.body)});
	}, null, "List VREs");

const setVre = (vreId) => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${config.apiUrl.v4}/metadata/${vreId}`
	}, (err, resp) => {
		dispatch({type: "SET_VRE", vreId: vreId, collections: JSON.parse(resp.body)});
	}, null, `Fetch VRE description for ${vreId}`);

export {listVres, setVre};
