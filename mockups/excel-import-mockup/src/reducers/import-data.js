import { getItem } from "../util/persist";
import merge from "merge-options";

const initialState = getItem("importData") || {
	isUploading: false,
	sheets: null,
	activeCollection: null
};

function findIndex(arr, f) {
	let length = arr.length;
	for (var i = 0; i < length; i++) {
    if (f(arr[i], i, arr)) {
      return i;
    }
  }
	return -1;
}

function sheetRowFromDictToArray(rowdict, arrayOfVariableNames) {
	return arrayOfVariableNames.map(name => rowdict[name]);
}

function addRows(curRows, newRows, arrayOfVariableNames) {
	return curRows.concat(
		newRows.map(item => sheetRowFromDictToArray(item, arrayOfVariableNames))
	);
}

export default function(state=initialState, action) {
	switch (action.type) {
		case "START_UPLOAD":
			return {...state, isUploading: true};
		case "FINISH_UPLOAD":
			return {...state,
				sheets: action.data.collections.map(sheet => ({
					collection: sheet.name,
					variables: sheet.variables,
					rows: [],
					nextUrl: sheet.data
				})),
				activeCollection: action.data.collections[0].name,
				vre: action.data.vre,
				saveMappingUrl: action.data.saveMapping,
				executeMappingUrl: action.data.executeMapping
			};
		case "COLLECTION_ITEMS_LOADING_SUCCEEDED":
			let sheetIdx = findIndex(state.sheets, sheet => sheet.collection === action.collection)
			var result = {
				...state,
				sheets: [
					...state.sheets.slice(0, sheetIdx),
					{
						...state.sheets[sheetIdx],
						rows: addRows(state.sheets[sheetIdx].rows, action.data.items, state.sheets[sheetIdx].variables),
						nextUrl: action.data._next
					},
					...state.sheets.slice(sheetIdx + 1)
				]
			};

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
