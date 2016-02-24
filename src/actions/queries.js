import { fetchFieldDescription } from "./entity";


const selectQuery = (domain, queryIndex) => (dispatch) => {
	dispatch(fetchFieldDescription(domain, "SELECT_QUERY", {queryIndex: queryIndex, domain: domain}));
};

const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

export { deleteQuery, selectQuery };