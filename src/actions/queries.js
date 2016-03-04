const DOMAIN_MAP = {
	WomenWriters: {
		"document": "wwdocument",
		"keyword": "wwkeyword",
		"collective": "wwcollective",
		"person": "wwperson"
	}
};

const selectQuery = (domain, queryIndex) => (dispatch) =>
	dispatch({type: "SELECT_QUERY", queryIndex: queryIndex, domain: domain});

const setQueryPath = (path) => (dispatch) =>
	dispatch({type: "SET_QUERY_PATH", path: path});

const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

const changeQuery = (fieldPath, value) => (dispatch) =>
	dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});

const addQueryFilter = (fieldPath, value) => (dispatch, getState) => {
	if(value.type === "relation") {
		const targetDomain = DOMAIN_MAP[getState().vre.vreId][value.targetType];
		const newEntity = {type: "entity", domain: targetDomain, and: []};
		value.or = [newEntity];
		delete value.targetType;
	}
	dispatch({type: "ADD_QUERY_FILTER", fieldPath: fieldPath, value: value});
};

const deleteQueryFilter = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY_FILTER", queryIndex: queryIndex});


export { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter };