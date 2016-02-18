let initialState = {
	vreId: null,
	list: []
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_VRE":
			return {
				...state,
				vreId: action.vreId,
				list: action.list || state.list
			};

		case "LIST_VRES":
			return {
				...state,
				list: action.list
			};

		default:
			return state;
	}
}