import setIn from "../util/set-in";
import getIn from "../util/get-in";
import { getItem } from "../util/persist";

const newVariableDesc = (property, variableSpec) => ({
	property: property,
	variable: variableSpec,
	defaultValue: [],
	confirmed: false,
	valueMappings: {}
});

const scaffoldCollectionMappings = () => ({
	mockpersons: {
		archetypeName: null,
		mappings: [],
		ignoredColumns: [],
		customProperties: []
	},
	mockdocuments: {
		archetypeName: null,
		mappings: [],
		ignoredColumns: [],
		customProperties: []
	}
});

const initialState = getItem("mappings") || {
	collections: {},
	confirmed: false
};

const getMappingIndex = (state, action) =>
	state.collections[action.collection].mappings
		.map((m, i) => ({index: i, m: m}))
		.filter((mSpec) => mSpec.m.property === action.propertyField)
		.reduce((prev, cur) => cur.index, -1);

const mapCollectionArchetype = (state, action) => {
	let newCollections = setIn([action.collection, "archetypeName"], action.value, state.collections);
	newCollections = setIn([action.collection, "mappings"], [], newCollections);

	return {...state, collections: newCollections};
};

const upsertFieldMapping = (state, action) => {
	const foundIdx = getMappingIndex(state, action);
	const newCollections = setIn([action.collection, "mappings", foundIdx < 0 ? getIn([action.collection, "mappings"], state.collections).length : foundIdx],
		newVariableDesc(action.propertyField, action.importedField), state.collections);


	return {...state, collections: newCollections};
};

const clearFieldMapping = (state, action) => {
	const foundIdx = getMappingIndex(state, action);
	if (foundIdx < 0) { return state; }

	const current = getIn([action.collection, "mappings", foundIdx, "variable"], state.collections)
		.filter((m, i) => i !== action.clearIndex);

	let newCollections;
	if (current.length > 0) {
		newCollections = setIn([action.collection, "mappings", foundIdx, "variable"], current, state.collections);
	} else {
		const newMappings = getIn([action.collection, "mappings"], state.collections)
			.filter((m, i) => i !== foundIdx);
		newCollections = setIn([action.collection, "mappings"], newMappings, state.collections);
	}


	return {...state, collections: newCollections};
};

const setDefaultValue = (state, action) => {
	const foundIdx = getMappingIndex(state, action);
	if (foundIdx > -1) {
		const newCollections = setIn([action.collection, "mappings", foundIdx, "defaultValue"], action.value, state.collections);
		return {...state, collections: newCollections};
	}

	return state;
};

const setFieldConfirmation = (state, action, value) => {
	const current = (getIn([action.collection, "mappings"], state.collections) || [])
		.map((vm) => ({...vm, confirmed: action.propertyField === vm.property ? value : vm.confirmed}));
	let newCollections = setIn([action.collection, "mappings"], current, state.collections);

	if (value === true) {
		const confirmedVariableNames = current.map((m) => m.variable.map((v) => v.variableName)).reduce((a, b) => a.concat(b));
		const newIgnoredColums = getIn([action.collection, "ignoredColumns"], state.collections)
			.filter((ic) => confirmedVariableNames.indexOf(ic) < 0);
		newCollections = setIn([action.collection, "ignoredColumns"], newIgnoredColums, newCollections);
	}

	return {...state, collections: newCollections};
};

const setValueMapping = (state, action) => {
	const foundIdx = getMappingIndex(state, action);

	if (foundIdx > -1) {
		const newCollections = setIn([action.collection, "mappings", foundIdx, "valueMappings", action.timValue],
			action.mapValue, state.collections);
		return {...state, collections: newCollections};
	}
	return state;
};

const toggleIgnoredColumn = (state, action) => {
	let current = getIn([action.collection, "ignoredColumns"], state.collections);

	if (current.indexOf(action.variableName) < 0) {
		current.push(action.variableName);
	} else {
		current = current.filter((c) => c !== action.variableName);
	}

	return {...state, collections: setIn([action.collection, "ignoredColumns"], current, state.collections) };
};

const addCustomProperty = (state, action) => {
	const current = getIn([action.collection, "customProperties"], state.collections);
	const newCollections = setIn([action.collection, "customProperties", current.length], {name: action.propertyField, type: action.propertyType}, state.collections);

	return {...state, collections: newCollections};
};

const removeCustomProperty = (state, action) => {
	const foundIdx = getMappingIndex(state, action);

	const current = getIn([action.collection, "customProperties"], state.collections)
		.filter((cp) => cp.name !== action.propertyField);

	let newCollections = setIn([action.collection, "customProperties"], current, state.collections);

	if (foundIdx > -1) {
		const newMappings = getIn([action.collection, "mappings"], state.collections)
			.filter((m, i) => i !== foundIdx);
		newCollections = setIn([action.collection, "mappings"], newMappings, newCollections);
	}

	return {...state, collections: newCollections};
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "UPLOAD":
			return {...state, collections: scaffoldCollectionMappings()};

		case "MAP_COLLECTION_ARCHETYPE":
			return mapCollectionArchetype(state, action);

		case "CONFIRM_COLLECTION_ARCHETYPE_MAPPINGS":
			return {...state, confirmed: true};

		case "SET_FIELD_MAPPING":
			return upsertFieldMapping(state, action);

		case "CLEAR_FIELD_MAPPING":
			return clearFieldMapping(state, action);

		case "SET_DEFAULT_VALUE":
			return setDefaultValue(state, action);

		case "CONFIRM_FIELD_MAPPINGS":
			return setFieldConfirmation(state, action, true);

		case "UNCONFIRM_FIELD_MAPPINGS":
			return setFieldConfirmation(state, action, false);

		case "SET_VALUE_MAPPING":
			return setValueMapping(state, action);

		case "TOGGLE_IGNORED_COLUMN":
			return toggleIgnoredColumn(state, action);

		case "ADD_CUSTOM_PROPERTY":
			return addCustomProperty(state, action);

		case "REMOVE_CUSTOM_PROPERTY":
			return removeCustomProperty(state, action);
	}
	return state;
}





/*const updateVariable = (state, variableName, assignments = []) => {
	const sheetIndex = state.sheets.map((sheet) => sheet.collection).indexOf(state.activeCollection);

	let newSheets = state.sheets;
	for (let i = 0; i < assignments.length; i++) {
		const { key, value } = assignments[i];

		newSheets = setIn([sheetIndex, "variables", variableName, key], value, state.sheets);
		if (key !== "confirmed") {
			newSheets = setIn([sheetIndex, "variables", variableName, "confirmed"], false, newSheets);
		}
	}



	return {...state, sheets: newSheets};
};


const defaultTypeSpecs = {
	links: {
		type: "url",
		orderOfAppearance: true,
		listPosition: 1
	},
	altnames: {
		type: "",
		orderOfAppearance: true,
		listPosition: 1
	},
	names: {
		orderOfAppearance: true,
		listPosition: 1,
		componentType: "forename",
		componentOrderOfAppearance: true,
		componentListPosition: 1
	},
	relation: {
		linksToOtherSheet: true,
		reusesRelationType: true,
		relationType: null
	}

};

const scaffoldVariableDesc = () => ({
	defaultValue: null,
	importValue: false,
	name: null,
	type: null,
	confirmed: false,
	typeSpec: {}
});



const updateVariableTypeSpec = (state, key, variableName, value) => {
	const sheetIndex = state.sheets.map((sheet) => sheet.collection).indexOf(state.activeCollection);
	let newSheets = setIn([sheetIndex, "variables", variableName, "typeSpec", key], value, state.sheets);

	if (key !== "confirmed") {
		newSheets = setIn([sheetIndex, "variables", variableName, "confirmed"], false, newSheets);
	}

	if (key === "linksToOtherSheet") {
		newSheets = setIn([sheetIndex, "variables", variableName, "typeSpec", "targetCollection"], null, newSheets);
		newSheets = setIn([sheetIndex, "variables", variableName, "typeSpec", "relationType"], null, newSheets);
	}

	if (key === "targetCollection") {
		newSheets = setIn([sheetIndex, "variables", variableName, "typeSpec", "relationType"], null, newSheets);
	}

	if (key === "relationType") {
		newSheets = setIn([sheetIndex, "variables", variableName, "name"], value, newSheets);

	}

	return {...state, sheets: newSheets};
};*/