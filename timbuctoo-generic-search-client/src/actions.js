import { createIndexes } from "./actions/solr";
import xhr from "xhr";

export default function actionsMaker(navigateTo, dispatch) {
	const actions = {
		onCreateIndexes: () => {
			dispatch(createIndexes())
		},
		onFetchEntity: (collectionName, id) => {
			dispatch((redispatch) => {
				redispatch({type: "START_ENTITY_FETCH"});
				xhr(`${process.env.SERVER}/v2.1/domain/${collectionName}/${id}`, (err, resp, body) => {
					redispatch({type: "RECEIVE_ENTITY", entity: JSON.parse(body)});
				})
				
			});
		},
		onSetActiveClient: (name) => dispatch({type: "SET_ACTIVE_CLIENT", activeClient: name})
	};
	return actions;
};