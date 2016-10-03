import { getItem } from "../util/persist";

const initialState = getItem("importData") || {
	isUploading: false,
	sheets: null,
	activeCollection: null,
	publishErrors: false,
	uploadedFileName: undefined
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

function sheetRowFromDictToArray(rowdict, arrayOfVariableNames, mappingErrors) {
	return arrayOfVariableNames.map(name => ({
		value: rowdict[name],
		error: mappingErrors[name] || undefined
	}));
}

function addRows(curRows, newRows, arrayOfVariableNames) {
	return curRows.concat(
		newRows.map(item => sheetRowFromDictToArray(item.values || {}, arrayOfVariableNames, item.errors || {}))
	);
}

export default function(state=initialState, action) {
	switch (action.type) {
		case "START_UPLOAD":
			return {...initialState, uploadStatus: "transfering file"};
		case "UPLOAD_STATUS_UPDATE":
			if (action.data) {
				var failures = state.failures || 0;
				var currentSheet = state.currentSheet || "";
				var rows = state.rows || 0;
				var prevRows = state.prevRows || 0;
				if (action.data.substr(0, "failure: ".length) === "failure: ") {
					failures += 1;
				} else if (action.data.substr(0, "sheet: ".length) === "sheet: ") {
					currentSheet = action.data.substr("sheet: ".length);
					prevRows = rows;
				} else {
					rows = action.data*1 - prevRows;
				}
				var uploadStatus = "processing " + currentSheet + " (row " + rows + (failures > 0 ? ", " + failures + " failures" : "") + ")";
				return {...state, 
					failures,
					rows,
					currentSheet,
					uploadStatus: uploadStatus
				};
			}
			return state;
		case "FINISH_UPLOAD":
			return {...state,
				uploadStatus: undefined,
				failures: 0,
				currentSheet: "",
				rows: undefined,
				publishErrors: false,
				uploadedFileName: action.uploadedFileName,
				sheets: action.data.collections.map(sheet => ({
					collection: sheet.name,
					variables: sheet.variables,
					rows: [],
					nextUrl: sheet.data,
					nextUrlWithErrors: sheet.dataWithErrors
				})),
				activeCollection: action.data.collections[0].name,
				vre: action.data.vre,
				saveMappingUrl: action.data.saveMapping,
				executeMappingUrl: action.data.executeMapping
			};
		case "COLLECTION_ITEMS_LOADING_SUCCEEDED":
			let sheetIdx = findIndex(state.sheets, sheet => sheet.collection === action.collection);
			return {
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

		case "COLLECTION_ITEMS_LOADING_FINISHED":
			const result = {...state};
			result.sheets = result.sheets.slice();
			result.sheets
				.forEach((sheet, i) => {
					if (sheet.collection === action.collection) {
						result.sheets[i] = {
							...sheet,
							isLoading: false
						};
					}
				});

			return result;
		case "SET_ACTIVE_COLLECTION":
			return {...state, activeCollection: action.collection};
		case "PUBLISH_HAD_ERROR":
			// clear the sheets to force reload
			return {
				...state,
				publishErrors: true,
				sheets: state.sheets.map((sheet) => ({
					...sheet,
					rows: [],
					nextUrl: sheet.nextUrlWithErrors
				}))
			};
		case "PUBLISH_SUCCEEDED":
			// clear the sheets to force reload
			return {
				...state,
				publishErrors: false,
				sheets: state.sheets.map((sheet) => ({
					...sheet,
					rows: [],
					nextUrl: sheet.nextUrlWithErrors
				}))
			};
	}

	return state;
}
