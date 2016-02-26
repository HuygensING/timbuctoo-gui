import clone from "clone-deep";
import setIn from "./util/set-in";
import store from "../store";
import parseGremlin from "../parsers/gremlin";
import debounce from "lodash.debounce";
import xhr from "xhr";

let initialState = {
	queries: [],
	entity: null,
	currentQuery: -1,
	results: "",
	resultCount: "",
	resultsPending: false
};

const makeQuery = (domain, fieldDefinitions) => {
	return {
		domain: domain,
		deleted: false,
		pathToSelectedEntity: [],
		entity: {domain: domain, fieldDefinitions: fieldDefinitions, data: {}}
	};
};

const getIn = (path, data) =>
	path.length === 0 ? data : getIn(path, data[path.shift()]);


const sendQuery = debounce(function(q) {
	xhr({method: "GET", url: `/api/v2.1/gremlin?query=${q[0]}`}, (err, resp) => { store.dispatch({type: "SET_QUERY_RESULTS", results: resp.body}); });
	xhr({method: "GET", url: `/api/v2.1/gremlin?query=${q[1]}`}, (err, resp) => { store.dispatch({type: "SET_QUERY_RESULT_COUNT", count: resp.body}); });
}, 2000);


const setQuery = (state) => {
	if(state.currentQuery > -1) {
		sendQuery(parseGremlin(state.queries[state.currentQuery]));
		state = {...state, resultCount: "", resultsPending: true};
	}
	return state;
};


export default function(state=initialState, action) {
	let current;
	let pathToSelectedEntity;
	switch (action.type) {
		case "SELECT_QUERY":
			current = state.queries[action.data.queryIndex] ?
					state.queries :
					setIn([action.data.queryIndex], makeQuery(action.data.domain, action.fieldDefinitions), clone(state.queries));

			return setQuery({
				...state,
				queries: current,
				currentQuery: action.data.queryIndex,
				entity: current[action.data.queryIndex].entity
			});

		case "SET_QUERY_PATH": {
			current = setIn([state.currentQuery, "pathToSelectedEntity"], action.path, clone(state.queries));
			return setQuery({
				...state,
				queries: current,
				entity: getIn([state.currentQuery].concat(action.path).concat("entity"), state.queries)
			});
		}

		case "SET_QUERY_FIELD_VALUE":
			pathToSelectedEntity = state.queries[state.currentQuery].pathToSelectedEntity;
			current = setIn([state.currentQuery].concat(pathToSelectedEntity).concat(["entity", "data"]).concat(action.fieldPath), action.value, clone(state.queries));
			return setQuery({
				...state,
				queries: current,
				entity: getIn([state.currentQuery].concat(pathToSelectedEntity).concat("entity"), current)
			});

		case "SET_QUERY_RELATION_VALUE":
			pathToSelectedEntity = state.queries[state.currentQuery].pathToSelectedEntity;
			const newEntity = {domain: action.data.domain, fieldDefinitions: action.fieldDefinitions, data: {}};
			action.data.value[action.data.value.length - 1].entity = newEntity;
			current = setIn([state.currentQuery].concat(pathToSelectedEntity).concat(["entity", "data"]).concat(action.data.fieldPath), action.data.value, clone(state.queries));

			return setQuery({
				...state,
				queries: current,
				entity: getIn([state.currentQuery].concat(pathToSelectedEntity).concat("entity"), current)
			});


		case "SET_QUERY_RESULTS":
			return {...state, results: action.results, resultsPending: false};


		case "SET_QUERY_RESULT_COUNT":
			return {...state, resultCount: action.count, resultsPending: false};

		case "DELETE_QUERY":
			pathToSelectedEntity = clone(state.queries[action.queryIndex].pathToSelectedEntity);
			if(pathToSelectedEntity.length === 0) {
				return {
					...state,
					queries: setIn([action.queryIndex], {...state.queries[action.queryIndex], deleted: true}, clone(state.queries)),
					currentQuery: -1
				};
			} else {
				const deleteRelationIndex = pathToSelectedEntity.pop();
				let relations = getIn([state.currentQuery].concat(pathToSelectedEntity), clone(state.queries));

				relations.splice(deleteRelationIndex, 1);
				current = setIn([state.currentQuery].concat(pathToSelectedEntity), relations, clone(state.queries));
				current[state.currentQuery].pathToSelectedEntity = [];
				return setQuery({
					...state,
					queries: current,
					entity: current[state.currentQuery].entity
				});
			}

	}

	return state;
}