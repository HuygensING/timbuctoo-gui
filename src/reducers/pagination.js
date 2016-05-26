let initialState = {
	start: 0,
	rows: 50
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_PAGINATION_START":
			return {...state, start: action.start};
		default:
			return state;
	}
}