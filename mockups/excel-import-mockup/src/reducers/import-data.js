import { getItem } from "../util/persist";
import merge from "merge-options";

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
				sheets: action.data.collections.map(coll => ({
					collection: coll.name,
					variables: coll.variables,
					rows: [],
					nextUrl: coll.data
				})),
				activeCollection: action.data.collections[0].name,
				vre: action.data.vre,
				saveMappingUrl: action.data.saveMapping,
				executeMappingUrl: action.data.executeMapping
			};
		case "COLLECTION_ITEMS_LOADING_SUCCEEDED":
			var result = {...state};
			result.sheets = result.sheets.slice();
			result.sheets
				.forEach((sheet, i) => {
					if (sheet.collection === action.collection) {
						result.sheets[i] = {
							...sheet,
							rows: sheet.rows.concat(
								action.data.items.map(item => sheet.variables.map(name => item[name]))
							),
							nextUrl: action.data.next
						}
					}
				});

			return result;
		case "COLLECTION_ITEMS_LOADING_FINISHED":
			var result = {...state};
			result.sheets = result.sheets.slice();
			result.sheets
				.forEach((sheet, i) => {
					if (sheet.collection === action.collection) {
						result.sheets[i] = {
							...sheet,
							isLoading: false
						}
					}
				});

			return result;
		case "SET_ACTIVE_COLLECTION":
			return {...state, activeCollection: action.collection};
	}

	return state;
}
