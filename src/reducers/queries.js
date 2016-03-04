import debounce from "lodash.debounce";

import server from "../actions/server";
import setIn from "../util/set-in";
import getIn from "../util/get-in";

import store from "../store";
import parseGremlin from "../parsers/gremlin";

const initialState = {
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
		entity: {
			type: "entity",
			domain: domain,
			and: []
		}
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
			sendDelayedQuery(parseGremlin(state.queries[state.currentQuery]));
		} else {
			sendQuery(parseGremlin(state.queries[state.currentQuery]));
		}

		state = {...state, resultCount: "", resultsPending: true, resultCountPending: true};
	}

	return state;
};

const selectQuery = (state, action) => {
	const current = state.queries[action.queryIndex] ?
			state.queries :
			setIn([action.queryIndex], makeQuery(action.domain), state.queries);

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
	let sliceEnd = pathToQuerySelection.length - 1;
	let deleteQueryFilterIndex = pathToQuerySelection[sliceEnd];
	if(deleteQueryFilterIndex === "entity") {
		sliceEnd = pathToQuerySelection.length - 2;
		deleteQueryFilterIndex = pathToQuerySelection[sliceEnd];
	}

	let queryFilters = getIn([state.currentQuery].concat(pathToQuerySelection.slice(0, sliceEnd)), state.queries);

	queryFilters.splice(deleteQueryFilterIndex, 1);

	const current = setIn([state.currentQuery].concat(pathToQuerySelection.slice(0, sliceEnd)), queryFilters, state.queries);
	current[state.currentQuery].pathToQuerySelection = ["entity"];
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