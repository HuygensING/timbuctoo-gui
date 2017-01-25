let initialState = {
	indexPresent: false,
	indexesPending: false,
	searchStates: {},
	activeClient: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_INDEX_PRESENT":
			return {
				...state,
				indexPresent: action.present,
				indexesPending: false
			};
		case "INDEXES_PENDING":
			return {
				...state,
				indexesPending: true
			};

		case "SET_SEARCH_STATE":
			return {
				...state,
				searchStates: {
					...state.searchStates,
					[action.collectionName]: action.searchState
				}
			};

		case "SET_ACTIVE_CLIENT":
			return {
				...state,
				activeClient: action.activeClient
			};

		default:
			return state;
	}
}