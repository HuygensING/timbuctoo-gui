const deleteQuery = (queryIndex) => (dispatch) =>
	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});

export { deleteQuery };