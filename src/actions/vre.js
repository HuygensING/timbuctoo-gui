import server from "./server";
import actions from "./index";
import {makeNewEntity} from "./entity";
import {fetchEntityList} from "./entity";

const listVres = () => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${process.env.server}/v2.1/system/vres`
	}, (err, resp) => {
		dispatch({type: "LIST_VRES", list: JSON.parse(resp.body)});
	}, null, "List VREs");

const setVre = (vreId) => (dispatch) =>
	server.performXhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${process.env.server}/v2.1/metadata/${vreId}?withCollectionInfo=true`
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			var body = JSON.parse(resp.body);
			dispatch({type: "SET_VRE", vreId: vreId, collections: body});

			let defaultDomain = Object.keys(body)
				.map(collectionName => body[collectionName])
				.filter(collection => !collection.unknown && !collection.relationCollection)[0]
				.collectionName;

			dispatch(makeNewEntity(defaultDomain))
			dispatch({type: "SET_DOMAIN", defaultDomain});
			dispatch(fetchEntityList(defaultDomain));
		}
	}, () => dispatch({type: "SET_VRE", vreId: vreId, collections: {}}), `Fetch VRE description for ${vreId}`);


export {listVres, setVre};
