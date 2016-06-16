import store from "../reducers/store";

export default {
	onUpload: () => store.dispatch({type: "UPLOAD"}),
	onSelectCollection: (collection) => store.dispatch({type: "SET_ACTIVE_COLLECTION", collection: collection}),


	onMapCollectionArchetype: (collection, value) => store.dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),

	onConfirmCollectionArchetypeMappings: () => store.dispatch({type: "CONFIRM_COLLECTION_ARCHETYPE_MAPPINGS"}),

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
		store.dispatch({type: "TOGGLE_IGNORED_COLUMN", collection: collection, variableName: variableName})
};