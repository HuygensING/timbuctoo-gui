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


export { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter, moveQueryPosition };