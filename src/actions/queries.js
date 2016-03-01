import { crud } from "./crud";

const DOMAIN_MAP = {
	WomenWriters: {
		"document": "wwdocument",
		"keyword": "wwkeyword",
		"collective": "wwcollective",
		"person": "wwperson"
	}
};

const fetchFieldDescription = (domain, next = () => {}) =>
	crud.fetchFieldDescription(domain, (fieldDefinitions) =>
		next(fieldDefinitions)
	);

const selectQuery = (domain, queryIndex) => (dispatch) =>
	fetchFieldDescription(domain, (fieldDefinitions) =>
		dispatch({type: "SELECT_QUERY", queryIndex: queryIndex, domain: domain, fieldDefinitions: fieldDefinitions}));

const setQueryPath = (path) => (dispatch) =>
	dispatch({type: "SET_QUERY_PATH", path: path});

const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

const changeQuery = (fieldPath, value) => (dispatch, getState) => {
	if(value.length > 0 && value[value.length - 1].type === "relation") {
		const targetDomain = DOMAIN_MAP[getState().vre.vreId][value[value.length - 1].targetType];

		fetchFieldDescription(targetDomain, (fieldDefinitions) => {
			const newEntity = {domain: targetDomain, fieldDefinitions: fieldDefinitions, and: []};
			value[value.length - 1].entity = newEntity;
			dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
		});

	} else {
		dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
	}
};



export { deleteQuery, selectQuery, changeQuery, setQueryPath };