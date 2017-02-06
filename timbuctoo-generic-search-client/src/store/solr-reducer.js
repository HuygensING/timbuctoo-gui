let initialState = {
	statusPending: true,
	indexPresent: false,
	indexesPending: false,
	searchStates: {},
	activeClient: null,
	message: "",
	currentCollection: ""
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "SET_INDEX_PRESENT":
			return {
				...state,
				indexPresent: action.present,
				indexesPending: false,
				statusPending: false
			};
		case "INDEXES_PENDING":
			var newState = {
				...state,
				indexesPending: true,
				statusPending: false
			};
			if (action.errorMessage) {
				newState.message = action.errorMessage
			} else if (action.data) {
				newState.currentCollection = ""
				newState.message = "No dataset started..."
				for (var key in action.data) {
					if (typeof action.data[key] == "object" ) {
						if (action.data[key].finished) {
							newState.currentCollection = key
							newState.message = " complete"
						} else {
							newState.currentCollection = key
							newState.message = action.data[key].count
							break;
						}
					}
				}
			} else {
				newState.message = "";
			}
			return newState;

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