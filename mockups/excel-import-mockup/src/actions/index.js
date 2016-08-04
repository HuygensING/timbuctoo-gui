import store from "../store";
import xhr from "xhr";
import mappingToJsonLdRml from "../util/mappingToJsonLdRml"
var toJson;
if (process.env.NODE_ENV === "development") {
	toJson = function toJson(data) {
		return JSON.stringify(data, undefined, 2);
	}
} else {
	toJson = function toJson(data) {
		return JSON.stringify(data);
	}
}

var actions = {
	onUploadFileSelect: function (files) {
		let file = files[0];
		let formData = new FormData();
		formData.append("file", file);
		formData.append("vre", file.name);
		store.dispatch({type: "START_UPLOAD"})
		store.dispatch(function (dispatch, getState) {
			var state = getState();
			var payload = {
				body: formData,
				headers: {
					"Authorization": state.userdata.userId
				}
			};
			xhr.post(process.env.server + "/v2.1/bulk-upload", payload, function (err, resp) {
				let location = resp.headers.location;
				xhr.get(location, function (err, resp, body) {
					dispatch({type: "FINISH_UPLOAD", data: JSON.parse(body)})
				});
			});
		});
	},

	onSaveMappings: function () {
		store.dispatch({type: "SAVE_STARTED"})
		store.dispatch(function (dispatch, getState) {
			var state = getState();
			var payload = {
				json: mappingToJsonLdRml(state.mappings, state.importData.vre),
				headers: {
					"Authorization": state.userdata.userId
				}
			};

			xhr.post(state.importData.saveMappingUrl, payload, function (err, resp) {
				if (err) {
					dispatch({type: "SAVE_HAD_ERROR"})
				} else {
					dispatch({type: "SAVE_SUCCEEDED"})
				}
				dispatch({type: "SAVE_FINISHED"})
			});
		});
	},

	onPublishData: function (){
		store.dispatch({type: "PUBLISH_STARTED"})
		store.dispatch(function (dispatch, getState) {
			var state = getState();
			var payload = {
				headers: {
					"Authorization": state.userdata.userId
				}
			};

			xhr.post(state.importData.executeMappingUrl, payload, function (err, resp) {
				if (err) {
					dispatch({type: "PUBLISH_HAD_ERROR"})
				} else {
					dispatch({type: "PUBLISH_SUCCEEDED"})
				}
				dispatch({type: "PUBLISH_FINISHED"})
			});
		});
	},

	onSelectCollection: (collection) => {
		store.dispatch({type: "SET_ACTIVE_COLLECTION", collection: collection});
		store.dispatch(function (dispatch, getState) {
			var state = getState();
			var currentSheet = state.importData.sheets.find(x => x.collection === collection);
			if (currentSheet.rows.length === 0 && currentSheet.nextUrl && !currentSheet.isLoading) {
				var payload = {
					headers: {
						"Authorization": state.userdata.userId
					}
				};
				dispatch({type: "COLLECTION_ITEMS_LOADING" })
				xhr.get(currentSheet.nextUrl, payload, function (err, resp, body) {
					if (err) {
						dispatch({type: "COLLECTION_ITEMS_LOADING_ERROR", collection: collection, error: err })
					} else {
						try {
							dispatch({type: "COLLECTION_ITEMS_LOADING_SUCCEEDED", collection: collection, data: JSON.parse(body)});
						} catch(e) {
							dispatch({type: "COLLECTION_ITEMS_LOADING_ERROR", collection: collection, error: e })
						}
					}
					dispatch({type: "COLLECTION_ITEMS_LOADING_FINISHED", collection: collection})
				});
			}
		});
	},

	onMapCollectionArchetype: (collection, value) =>
		store.dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),

	onConfirmCollectionArchetypeMappings: () => {
		store.dispatch({type: "CONFIRM_COLLECTION_ARCHETYPE_MAPPINGS"})
		store.dispatch(function (dispatch, getState) {
			let state = getState();
			actions.onSelectCollection(state.importData.activeCollection);
		})
	},

	onSetFieldMapping: (collection, propertyField, importedField) =>
		store.dispatch({type: "SET_FIELD_MAPPING", collection: collection, propertyField: propertyField, importedField: importedField}),

	onClearFieldMapping: (collection, propertyField, clearIndex) =>
		store.dispatch({type: "CLEAR_FIELD_MAPPING", collection: collection, propertyField: propertyField, clearIndex: clearIndex}),

	onSetDefaultValue: (collection, propertyField, value) =>
		store.dispatch({type: "SET_DEFAULT_VALUE", collection: collection, propertyField: propertyField, value: value}),

	onConfirmFieldMappings: (collection, propertyField) =>
		store.dispatch({type: "CONFIRM_FIELD_MAPPINGS", collection: collection, propertyField: propertyField}),

	onUnconfirmFieldMappings: (collection, propertyField) =>
		store.dispatch({type: "UNCONFIRM_FIELD_MAPPINGS", collection: collection, propertyField: propertyField}),

	onSetValueMapping: (collection, propertyField, timValue, mapValue) =>
		store.dispatch({type: "SET_VALUE_MAPPING", collection: collection, propertyField: propertyField, timValue: timValue, mapValue: mapValue}),

	onIgnoreColumnToggle: (collection, variableName) =>
		store.dispatch({type: "TOGGLE_IGNORED_COLUMN", collection: collection, variableName: variableName}),

	onAddCustomProperty: (collection, propertyName, propertyType) =>
		store.dispatch({type: "ADD_CUSTOM_PROPERTY", collection: collection, propertyField: propertyName, propertyType: propertyType}),

	onRemoveCustomProperty: (collection, propertyName) =>
		store.dispatch({type: "REMOVE_CUSTOM_PROPERTY", collection: collection, propertyField: propertyName}),
};

export default actions;
