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

const changeQuery = (fieldPath, value) => (dispatch, getState) => {
	if(value.length > 0 && value[value.length - 1].type === "relation") {
		const targetDomain = DOMAIN_MAP[getState().vre.vreId][value[value.length - 1].targetType];

		const newEntity = {domain: targetDomain, and: []};
		value[value.length - 1].entity = newEntity;
		delete value[value.length - 1].targetType;
		dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});

	} else {
		dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
	}
};



export { deleteQuery, selectQuery, changeQuery, setQueryPath };