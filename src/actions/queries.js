import { parsers } from "../parsers/gremlin";
import server from "./server";


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
	server.fastXhr({method: "POST", url: `/api/v2.1/gremlin`, body: q[0]}, (err, resp) => dispatch({type: "SET_QUERY_RESULTS", results: resp.body}));
	server.fastXhr({method: "POST", url: `/api/v2.1/gremlin`, body: q[1]}, (err, resp) => dispatch({type: "SET_QUERY_RESULT_COUNT", count: resp.body}));
};




export { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter, moveQueryPosition, submitQuery, nameQuery };