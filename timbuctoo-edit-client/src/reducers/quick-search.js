let initialState = {
	start: 0,
	list: [],
	rows: 50,
	query: ""
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_PAGINATION_START":
			return {...state, start: action.start};
		case "RECEIVE_ENTITY_LIST":
			return {...state, ...{
				list: action.data
			}};
		case "SET_QUICKSEARCH_QUERY": {
			return {...state, ...{
				query: action.value
			}};
		}
		default:
			return state;
	}
}