import clone from "clone-deep";
import setIn from "./util/set-in";

let initialState = {
	queries: [],
	currentQuery: -1
};

/* TODO: add path to active entity */
const makeQuery = (domain, fieldDefinitions) => {
	return {
		domain: domain,
		deleted: false,
		entity: {domain: domain, fieldDefinitions: fieldDefinitions, data: {}}
	};
};

export default function(state=initialState, action) {
	let current;
	switch (action.type) {
		case "SELECT_QUERY":
			current = state.queries[action.data.queryIndex] ?
					state.queries :
					setIn([action.data.queryIndex], makeQuery(action.data.domain, action.fieldDefinitions), clone(state.queries));

			return {
				...state,
				queries: current,
				currentQuery: action.data.queryIndex,
				entity: current[action.data.queryIndex].entity
			};

		/* TODO: use path to active entity */
		case "SET_QUERY_FIELD_VALUE":
			current = setIn([state.currentQuery, "entity", "data"].concat(action.fieldPath), action.value, clone(state.queries));
			return {
				...state,
				queries: current,
				entity: current[state.currentQuery].entity
			};

		/* TODO: use path to active entity */
		case "SET_QUERY_RELATION_VALUE":
			const newEntity = {domain: action.data.domain, fieldDefinitions: action.fieldDefinitions, data: {}};
			action.data.value[action.data.value.length - 1].entity = newEntity;
			current = setIn([state.currentQuery, "entity", "data"].concat(action.data.fieldPath), action.data.value, clone(state.queries));

			return {
				...state,
				queries: current,
				entity: current[state.currentQuery].entity
			};

		case "DELETE_QUERY":
			return {
				...state,
				queries: setIn([action.queryIndex], {...state.queries[action.queryIndex], deleted: true}, clone(state.queries)),
				currentQuery: -1
			};
	}

	return state;
}