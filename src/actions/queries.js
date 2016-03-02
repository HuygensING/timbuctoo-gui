const selectQuery = (domain, queryIndex) => (dispatch, getState) =>
	dispatch({type: "SELECT_QUERY", queryIndex: queryIndex, domain: domain, fieldDefinitions: getState().vre.collections[domain + "s"]});

const setQueryPath = (path) => (dispatch) =>
	dispatch({type: "SET_QUERY_PATH", path: path});

const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

const changeQuery = (fieldPath, value) => (dispatch, getState) => {
	if(value.length > 0 && value[value.length - 1].type === "relation") {
		const targetDomain = value[value.length - 1].targetType;
		const newEntity = {domain: targetDomain, fieldDefinitions: getState().vre.collections[targetDomain + "s"], and: []};
		value[value.length - 1].entity = newEntity;
		dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});

	} else {
		dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
	}
};



export { deleteQuery, selectQuery, changeQuery, setQueryPath };