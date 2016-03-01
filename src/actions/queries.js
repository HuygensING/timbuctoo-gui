import { crud } from "./crud";

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

const changeQuery = (fieldPath, value) => (dispatch) => {
	if(value.length > 0 && value[value.length - 1].type === "relation") {

		fetchFieldDescription(value[value.length - 1].targetType, (fieldDefinitions) => {
			const newEntity = {domain: value[value.length - 1].targetType, fieldDefinitions: fieldDefinitions, and: []};
			value[value.length - 1].entity = newEntity;
			dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
		});

	} else {
		dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
	}
};



export { deleteQuery, selectQuery, changeQuery, setQueryPath };