let initialState = {
	start: 0,
	list: [],
	rows: 50
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_PAGINATION_START":
			return {...state, start: action.start};
		case "RECEIVE_ENTITY_LIST":
			return {...state, ...{
				list: action.data
			}};
		default:
			return state;
	}
}