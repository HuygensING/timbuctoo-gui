let initialState = {
	indexPresent: false,
	indexesPending: false,
	searchStates: {}
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
			let newState = {...state};
			newState.searchStates[action.collectionName] = action.searchState;
			return newState;
		default:
			return state;
	}
}