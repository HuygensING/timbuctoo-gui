import { fetchFieldDescription } from "./entity";

const DOMAIN_MAP = {
	WomenWriters: {
		"document": "wwdocument",
		"keyword": "wwkeyword",
		"collective": "wwcollective",
		"person": "wwperson"
	}
};

const selectQuery = (domain, queryIndex) => (dispatch) =>
	dispatch(fetchFieldDescription(domain, "SELECT_QUERY", {queryIndex: queryIndex, domain: domain}));

const setQueryPath = (path) => (dispatch) =>
	dispatch({type: "SET_QUERY_PATH", path: path});

const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

const changeQuery = (fieldPath, value) => (dispatch, getState) => {
	if(fieldPath[0] === "@relations") {
		const targetDomain = DOMAIN_MAP[getState().vre.vreId][value[value.length - 1].targetType];

		dispatch(fetchFieldDescription(targetDomain, "SET_QUERY_RELATION_VALUE", {
			fieldPath: fieldPath,
			value: value,
			domain: targetDomain
		}));

	} else {
		dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
	}
};

export { deleteQuery, selectQuery, changeQuery, setQueryPath };