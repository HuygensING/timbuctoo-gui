let initialState = {
	vreId: null,
	list: [],
	collections: {},
	domain: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_VRE":
			return {
				...state,
				vreId: action.vreId,
				collections: action.collections || null,
				list: action.list || state.list
			};

		case "LIST_VRES":
			return {
				...state,
				list: action.list,
				collections: null
			};
		case "SET_DOMAIN":
			return {
				...state,
				domain: action.domain
			};

		default:
			return state;
	}
}