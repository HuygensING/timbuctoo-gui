import debounce from "lodash.debounce";

import server from "../actions/server";
import setIn from "../util/set-in";
import getIn from "../util/get-in";

import store from "../store";
import { parsers } from "../parsers/gremlin";

const initialState = {
	queries: [],
	currentQuery: -1,
	results: "",
	resultCount: "",
	resultsPending: false,
	resultCountPending: false
};

const makeQuery = (domain, position) => {
	return {
		domain: domain,
		deleted: false,
		pathToQuerySelection: ["or", 0],
		position: position,
		or: [{
			type: "entity",
			domain: domain,
			and: []
		}]
	};
};


let lastQTime = new Date().getTime();
const sendQuery = function(q) {
	const myQTime = new Date().getTime();
	if(myQTime < lastQTime) { return; }
	lastQTime = myQTime;
	server.fastXhr({method: "GET", url: `/api/v2.1/gremlin?query=${q[0]}`}, (err, resp) => {
		if(myQTime >= lastQTime) { store.dispatch({type: "SET_QUERY_RESULTS", results: resp.body}); }
	});
	server.fastXhr({method: "GET", url: `/api/v2.1/gremlin?query=${q[1]}`}, (err, resp) => {
		if(myQTime >= lastQTime) { store.dispatch({type: "SET_QUERY_RESULT_COUNT", count: resp.body}); }
	});
};

const sendDelayedQuery = debounce(sendQuery, 2000);


const setQuery = (state) => {
	if(state.currentQuery > -1) {
		if(state.resultsPending || state.resultCountPending) {
			sendDelayedQuery(parsers.parseGremlin(state.queries[state.currentQuery]));
		} else {
			sendQuery(parsers.parseGremlin(state.queries[state.currentQuery]));
		}

		state = {...state, resultCount: "", resultsPending: true, resultCountPending: true};
	}

	return state;
};

const selectQuery = (state, action) => {
	const current = state.queries[action.queryIndex] ?
			state.queries :
			setIn([action.queryIndex], makeQuery(action.domain, action.position), state.queries);

	return setQuery({
		...state,
		queries: current,
		currentQuery: action.queryIndex
	});
};

const setQueryPath = (state, action) => {
	const current = setIn([state.currentQuery, "pathToQuerySelection"], action.path, state.queries);
	return setQuery({
		...state,
		queries: current
	});
};

const setQueryFieldValue = (state, action) => {
	const pathToQuerySelection = state.queries[state.currentQuery].pathToQuerySelection;
	const current = setIn([state.currentQuery].concat(pathToQuerySelection).concat(action.fieldPath), action.value, state.queries);
	return setQuery({
		...state,
		queries: current
	});
};

const setQueryPosition = (state, action) => {
	const current = setIn([action.queryIndex].concat("position"), action.position, state.queries);
	return {
		...state,
		queries: current
	};
};

const getPath = (state, action) => {
	const pathToQuerySelection = state.queries[state.currentQuery].pathToQuerySelection;
	if(typeof action.fieldPath === "number") {
		const fullPath = [state.currentQuery].concat(pathToQuerySelection);
		return fullPath.slice(0, fullPath.length + action.fieldPath);
	} else {
		return [state.currentQuery].concat(pathToQuerySelection).concat(action.fieldPath);
	}
};

const addQueryFilter = (state, action) => {
	const pathToFilters = getPath(state, action);

	const filters = getIn(pathToFilters, state.queries);
	const current = setIn(pathToFilters.concat(filters.length), action.value, state.queries);

	return setQuery({
		...state,
		queries: current
	});
};

const deleteQuery = (state, action) => {
	return {
		...state,
		queries: setIn([action.queryIndex], {...state.queries[action.queryIndex], deleted: true}, state.queries),
		currentQuery: -1
	};
};

const deleteQueryFilter = (state, action) => {
	const pathToQuerySelection = state.queries[action.queryIndex].pathToQuerySelection;
	const currentNode = getIn([state.currentQuery].concat(pathToQuerySelection), state.queries);
	let sliceEnd = pathToQuerySelection.length - 1;

	if(typeof currentNode === "object" && currentNode.type === "entity" &&
		getIn([state.currentQuery].concat(pathToQuerySelection.slice(0, sliceEnd)), state.queries).length === 1) {
		sliceEnd = pathToQuerySelection.length - 3;
		deleteQueryFilterIndex = pathToQuerySelection[sliceEnd];
	}

	let deleteQueryFilterIndex = pathToQuerySelection[sliceEnd];
	let queryFilters = getIn([state.currentQuery].concat(pathToQuerySelection.slice(0, sliceEnd)), state.queries);

	queryFilters.splice(deleteQueryFilterIndex, 1);

	const current = setIn([state.currentQuery].concat(pathToQuerySelection.slice(0, sliceEnd)), queryFilters, state.queries);
	current[state.currentQuery].pathToQuerySelection = ["or", 0];
	return setQuery({
		...state,
		queries: current
	});
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SELECT_QUERY": return selectQuery(state, action);
		case "SET_QUERY_PATH": return setQueryPath(state, action);
		case "SET_QUERY_FIELD_VALUE": return setQueryFieldValue(state, action);
		case "SET_QUERY_POSITION": return setQueryPosition(state, action);
		case "ADD_QUERY_FILTER": return addQueryFilter(state, action);
		case "DELETE_QUERY": return deleteQuery(state, action);
		case "DELETE_QUERY_FILTER": return deleteQueryFilter(state, action);

		case "SET_QUERY_RESULTS":
			return {...state, results: action.results, resultsPending: false};

		case "SET_QUERY_RESULT_COUNT":
			return {...state, resultCount: action.count, resultCountPending: false};

	}

	return state;
}