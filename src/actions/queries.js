import { parsers } from "../parsers/gremlin";
import server from "./server";
import config from "../config";

const moveQueryPosition = (queryIndex, movement) => (dispatch, getState) => {
	dispatch({type: "SET_QUERY_POSITION", queryIndex: queryIndex, position: {
		x: getState().queries.queries[queryIndex].position.x - movement.x,
		y: getState().queries.queries[queryIndex].position.y - movement.y
	}});
};

const selectQuery = (domain, queryIndex, position = null) => (dispatch) =>
	dispatch({type: "SELECT_QUERY", queryIndex: queryIndex, domain: domain, position: position});

const setQueryPath = (path) => (dispatch) =>
	dispatch({type: "SET_QUERY_PATH", path: path});

const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

const changeQuery = (fieldPath, value) => (dispatch) =>
	dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});

const nameQuery = (value) => (dispatch) =>
	dispatch({type: "SET_QUERY_NAME", value: value});

const addQueryFilter = (fieldPath, value) => (dispatch) => {
	if(value.type === "relation") {
		const newEntity = {type: "entity", domain: value.targetType, and: []};
		value.or = [newEntity];
		value.targetDomain = value.targetType;
		delete value.targetType;
	}
	dispatch({type: "ADD_QUERY_FILTER", fieldPath: fieldPath, value: value});
};

const deleteQueryFilter = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY_FILTER", queryIndex: queryIndex});

const submitQuery = () => (dispatch, getState) => {
	const { queries } = getState();
	dispatch({type: "SET_QUERY_RESULTS_PENDING"});

	const q = parsers.parseGremlin(queries.queries[queries.currentQuery]);
	server.fastXhr({
		method: "POST",
		headers: {"Accept": "application/json", "Content-type": "application/json"},
		url: `${config.apiUrl.v4}/gremlin`,
		body: JSON.stringify({ or: queries.queries[queries.currentQuery]["or"]})
	}, (err, resp) => dispatch({type: "SET_QUERY_RESULTS", results: JSON.parse(resp.body)}));
/*	server.fastXhr({
		method: "POST",
		url: `${config.apiUrl.v4}/gremlin`,
		body: q[1]
	}, (err, resp) => dispatch({type: "SET_QUERY_RESULT_COUNT", count: resp.body}));*/
};

const saveQuery = () => (dispatch, getState) => {
	const { queries } = getState();
	const query = queries.queries[queries.currentQuery];
	server.fastXhr({method: "POST", headers: {"Content-type": "application/json"}, url: `${config.apiUrl.v4}/saved-queries`, body: JSON.stringify(query)},
		(err, resp) => dispatch({type: "SET_SAVED_QUERIES", savedQueries: JSON.parse(resp.body)})
	);
};

const loadSavedQueries = () => (dispatch) =>
	dispatch({type: "SET_SAVED_QUERIES", savedQueries: []});
//	server.fastXhr({method: "GET", url: `${config.apiUrl.v4}/saved-queries`},
//		(err, resp) => dispatch({type: "SET_SAVED_QUERIES", savedQueries: JSON.parse(resp.body)}));

const loadQuery = (name) => (dispatch) =>
	dispatch({type: "LOAD_SAVED_QUERY", name: name});

export {
	deleteQuery,
	selectQuery,
	changeQuery,
	setQueryPath,
	addQueryFilter,
	deleteQueryFilter,
	moveQueryPosition,
	submitQuery,
	saveQuery,
	nameQuery,
	loadSavedQueries,
	loadQuery
};