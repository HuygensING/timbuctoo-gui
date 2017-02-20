import xhr from "xhr";

const setArchetypes = (afterInit) => (dispatch) =>
	xhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${process.env.TIMBUCTOO_URL}/v2.1/metadata/Admin?withCollectionInfo=true`
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			var collectionMetadata = JSON.parse(resp.body);
			dispatch({ type: "SET_ARCHETYPES", collections: collectionMetadata });
			afterInit();
		}
	});


const setVre = (vreId, afterInit) => (dispatch) =>
	xhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: `${process.env.TIMBUCTOO_URL}/v2.1/metadata/${vreId}?withCollectionInfo=true`
	}, (err, resp) => {
		if (resp.statusCode === 200) {
			var collectionMetadata = JSON.parse(resp.body);
			dispatch({ type: "SET_VRE", vreId: vreId, collections: collectionMetadata });
			dispatch(setArchetypes(afterInit));
		}
	});


const onLODClick = () => (dispatch) =>
	dispatch({
				type: "OPEN_BROWSER_APP"
			})
	// xhr({
	// 	method: "GET",
	// 	headers: {
	// 		"Accept": "application/json"
	// 	},
	// 	url: `${process.env.TIMBUCTOO_URL}/v2.1/domain/${collectionName}/${id}`
	// }, (err, resp) => {
	// 	if (resp.statusCode === 200) {
	// 		var collectionMetadata = JSON.parse(resp.body);
	// 		console.log(resp.body)
	// 		dispatch({
	// 			type: 'OPEN_BROWSER_APP'
	// 		})
	// 	}
	// })

export { setVre, onLODClick };
