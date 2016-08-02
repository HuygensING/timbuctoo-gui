import { getItem } from "../util/persist";

const initialState = getItem("importData") || {
	isUploading: false,
	sheets: null,
	activeCollection: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "START_UPLOAD":
			return {...state, isUploading: true};
		case "FINISH_UPLOAD":
			return {...state,
				sheets: action.data.sheets,
				activeCollection: action.data.sheets[0].collection,
				vre: action.data.vre,
				saveMappingUrl: action.data.saveMapping,
				executeMappingUrl: action.data.executeMapping
			};
		case "SET_ACTIVE_COLLECTION":
			return {...state, activeCollection: action.collection};
	}

	return state;
}
