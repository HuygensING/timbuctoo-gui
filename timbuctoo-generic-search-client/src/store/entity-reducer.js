let initialState = {
	data: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "RECEIVE_ENTITY":
			return {
				...state,
				data: action.entity
			};

		default:
			return state;
	}
}