import xhr from "xhr";

const setArchetypes = (afterInit) => (dispatch) =>
	xhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${process.env.SERVER}/v2.1/metadata/Admin?withCollectionInfo=true`
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			var collectionMetadata = JSON.parse(resp.body);
			dispatch({type: "SET_ARCHETYPES", collections: collectionMetadata});
			afterInit();
		}
	});


const setVre = (vreId, afterInit) => (dispatch) =>
	xhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${process.env.SERVER}/v2.1/metadata/${vreId}?withCollectionInfo=true`
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			var collectionMetadata = JSON.parse(resp.body);
			dispatch({type: "SET_VRE", vreId: vreId, collections: collectionMetadata});
			dispatch(setArchetypes(afterInit));
		}
	});

export { setVre };
