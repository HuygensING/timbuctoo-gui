let initialState = {
	vreId: null,
	list: [],
	collections: {},
	archetypeCollections: {},
	domain: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_VRE":
			return {
				...state,
				vreId: action.vreId,
				collections: action.collections || null,
			};

		case "SET_ARCHETYPES":
			return {
				...state,
				archetypeCollections: action.collections || null,
			};
		
		default:
			return state;
	}
}