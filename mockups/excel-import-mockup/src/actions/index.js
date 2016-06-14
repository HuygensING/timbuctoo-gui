import store from "../reducers/store";

export default {
	onUpload: () => store.dispatch({type: "UPLOAD"}),
	onSelectCollection: (collection) => store.dispatch({type: "SET_ACTIVE_COLLECTION", collection: collection}),


	onMapCollectionArchetype: (collection, value) => store.dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),
	onSetFieldMapping: (collection, propertyField, importedField) =>
		store.dispatch({type: "SET_FIELD_MAPPING", collection: collection, propertyField: propertyField, importedField: importedField}),


	onConfirmFieldMappings: (collection, propertyField) =>
		store.dispatch({type: "CONFIRM_FIELD_MAPPINGS", collection: collection, propertyField: propertyField}),

	onUnconfirmFieldMappings: (collection, propertyField) =>
		store.dispatch({type: "UNCONFIRM_FIELD_MAPPINGS", collection: collection, propertyField: propertyField})

/*
	onUpdateVariable: (variableName, assignments = []) => store.dispatch({type: "UPDATE_VARIABLE", variableName: variableName, assignments: assignments}),
	onUpdateVariableTypeSpec: (variableName, key, value) => store.dispatch({type: "UPDATE_VARIABLE_TYPE_SPEC", value: value, variableName: variableName, key: key})
*/
};