import store from "../reducers/store";

export default {
	onUpload: (files) =>
		function (dispatch) {
			let formData = new FormData();
			formData.append(file.name, file);
			formData.append("vre", file.name);
			let xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.onload = function(e) {
				let result = xhr.getResponseHeader("Location");
				dispatch({type: "UPLOAD", location: result})
			};
			xhr.setRequestHeader("Authorization", state.userdata.userId)
			xhr.send(formData);  // multipart/form-data
		},

	onSelectCollection: (collection) =>
		store.dispatch({type: "SET_ACTIVE_COLLECTION", collection: collection}),

	onMapCollectionArchetype: (collection, value) =>
		store.dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),

	onConfirmCollectionArchetypeMappings: () =>
		store.dispatch({type: "CONFIRM_COLLECTION_ARCHETYPE_MAPPINGS"}),

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
