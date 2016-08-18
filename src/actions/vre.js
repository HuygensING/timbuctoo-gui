import server from "./server";
import config from "../config";
import actions from "./index";

const listVres = () => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${config.apiUrl.v4}/system/vres`
	}, (err, resp) => {
		dispatch({type: "LIST_VRES", list: JSON.parse(resp.body)});
	}, null, "List VREs");

const setVre = (vreId) => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${config.apiUrl.v4}/metadata/${vreId}?withCollectionInfo=true`
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			var body = JSON.parse(resp.body);
			dispatch({type: "SET_VRE", vreId: vreId, collections: body});

      let defaultDomain = Object.keys(body)[0];
      actions.onNew(defaultDomain);
      actions.onSelectDomain(defaultDomain);
		}
	}, () => dispatch({type: "SET_VRE", vreId: vreId, collections: {}}), `Fetch VRE description for ${vreId}`);


export {listVres, setVre};
