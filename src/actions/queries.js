const selectQuery = (domain, queryIndex) => (dispatch) =>
	dispatch({type: "SELECT_QUERY", queryIndex: queryIndex, domain: domain});

const setQueryPath = (path) => (dispatch) =>
	dispatch({type: "SET_QUERY_PATH", path: path});

const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

const changeQuery = (fieldPath, value) => (dispatch) =>
	dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});

const addQueryFilter = (fieldPath, value) => (dispatch) => {
	if(value.type === "relation") {
		const newEntity = {domain: value.targetType, and: []};
		value.entity = newEntity;
		delete value.targetType;
	}
	dispatch({type: "ADD_QUERY_FILTER", fieldPath: fieldPath, value: value});
};


export { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter };