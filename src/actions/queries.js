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
		const newEntity = {type: "entity", domain: value.targetType, and: []};
		value.or = [newEntity];
		value.targetDomain = targetDomain;
		delete value.targetType;
	}
	dispatch({type: "ADD_QUERY_FILTER", fieldPath: fieldPath, value: value});
};

const deleteQueryFilter = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY_FILTER", queryIndex: queryIndex});


export { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter };