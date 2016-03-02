import clone from "clone-deep";
import debounce from "lodash.debounce";

import server from "../actions/server";
import setIn from "../util/set-in";
import getIn from "../util/get-in";

import store from "../store";
import parseGremlin from "../parsers/gremlin";

let initialState = {
	queries: [],
	currentQuery: -1,
	results: "",
	resultCount: "",
	resultsPending: false,
	resultCountPending: false
};

const makeQuery = (domain) => {
	return {
		domain: domain,
		deleted: false,
		pathToQuerySelection: ["entity"],
		entity: {domain: domain, and: []}
	};
};



const sendQuery = function(q) {
	server.fastXhr({method: "GET", url: `/api/v2.1/gremlin?query=${q[0]}`}, (err, resp) => { store.dispatch({type: "SET_QUERY_RESULTS", results: resp.body}); });
	server.fastXhr({method: "GET", url: `/api/v2.1/gremlin?query=${q[1]}`}, (err, resp) => { store.dispatch({type: "SET_QUERY_RESULT_COUNT", count: resp.body}); });
};

const sendDelayedQuery = debounce(sendQuery, 2000);


const setQuery = (state) => {
	if(state.currentQuery > -1) {
		if(state.resultsPending || state.resultCountPending) {
			sendDelayedQuery(parseGremlin(state.queries[state.currentQuery]));
		} else {
			sendQuery(parseGremlin(state.queries[state.currentQuery]));
		}

		state = {...state, resultCount: "", resultsPending: true, resultCountPending: true};
	}

	return state;
};


export default function(state=initialState, action) {
	let current;
	let pathToQuerySelection;
	switch (action.type) {
		case "SELECT_QUERY":
			current = state.queries[action.queryIndex] ?
					state.queries :
					setIn([action.queryIndex], makeQuery(action.domain), state.queries);

			return setQuery({
				...state,
				queries: current,
				currentQuery: action.queryIndex
			});

		case "SET_QUERY_PATH": {
			current = setIn([state.currentQuery, "pathToQuerySelection"], action.path, state.queries);
			return setQuery({
				...state,
				queries: current
			});
		}

		case "SET_QUERY_FIELD_VALUE":
			pathToQuerySelection = state.queries[state.currentQuery].pathToQuerySelection;
			current = setIn([state.currentQuery].concat(pathToQuerySelection).concat(action.fieldPath), action.value, state.queries);
			return setQuery({
				...state,
				queries: current
			});

		// TODO: tidy up. remove pops, use slice
		case "DELETE_QUERY":
			pathToQuerySelection = clone(state.queries[action.queryIndex].pathToQuerySelection);
			if(pathToQuerySelection.length === 1) {
				return {
					...state,
					queries: setIn([action.queryIndex], {...state.queries[action.queryIndex], deleted: true}, state.queries),
					currentQuery: -1
				};
			} else {
				let deleteRelationIndex = pathToQuerySelection.pop();
				if(deleteRelationIndex === "entity") { deleteRelationIndex = pathToQuerySelection.pop(); }
				let relations = getIn([state.currentQuery].concat(pathToQuerySelection), clone(state.queries));

				relations.splice(deleteRelationIndex, 1);
				current = setIn([state.currentQuery].concat(pathToQuerySelection), relations, state.queries);
				current[state.currentQuery].pathToQuerySelection = ["entity"];
				return setQuery({
					...state,
					queries: current
				});
			}
			break;

		case "SET_QUERY_RESULTS":
			return {...state, results: action.results, resultsPending: false};

		case "SET_QUERY_RESULT_COUNT":
			return {...state, resultCount: action.count, resultCountPending: false};

	}

	return state;
}