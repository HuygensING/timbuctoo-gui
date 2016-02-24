import clone from "clone-deep";
import setIn from "./util/set-in";

let initialState = {
	queries: [],
	currentQuery: -1,
	currentFieldDefinitions: null
};

const makeQuery = (domain) => {

	return {
		domain: domain,
		deleted: false
	};
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SELECT_QUERY":
			return {
				...state,
				queries: state.queries[action.data.queryIndex] ? state.queries : setIn([action.data.queryIndex], makeQuery(action.domain), clone(state.queries)),
				currentQuery: action.data.queryIndex,
				currentFieldDefinitions: action.fieldDefinitions
			};
		case "DELETE_QUERY":
			return {
				...state,
				queries: setIn([action.queryIndex], {...state.queries[action.queryIndex], deleted: true}, clone(state.queries)),
				currentQuery: -1,
				currentFieldDefinitions: null
			};
	}

	return state;
}