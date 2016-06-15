import setIn from "./set-in";
import getIn from "./get-in";

const newVariableDesc = (property, variableName) => ({
	property: property,
	variable: variableName,
	confirmed: false,
	valueMappings: {}
});

const scaffoldCollectionMappings = () => ({
	mockpersons: {
		archetypeName: null,
		mappings: []
	},
	mockdocuments: {
		archetypeName: null,
		mappings: []
	}
});

const initialState = {
	collections: {}
};

const getMappingIndex = (state, action) =>
	state.collections[action.collection].mappings
		.map((m, i) => ({index: i, m: m}))
		.filter((mSpec) => mSpec.m.property === action.propertyField)
		.reduce((prev, cur) => cur.index, state.collections[action.collection].mappings.length);

const mapCollectionArchetype = (state, action) => {
	let newCollections = setIn([action.collection, "archetypeName"], action.value, state.collections);
	newCollections = setIn([action.collection, "mappings"], [], newCollections);

	return {...state, collections: newCollections};
};

const upsertFieldMapping = (state, action) => {
	const newCollections = setIn([action.collection, "mappings", getMappingIndex(state, action)],
		newVariableDesc(action.propertyField, action.importedField), state.collections);


	return {...state, collections: newCollections};
};

const setDefaultValue = (state, action) => {
	const newCollections = setIn([action.collection, "mappings", getMappingIndex(state, action), "defaultValue"], action.value, state.collections);
	return {...state, collections: newCollections};
};

const setFieldConfirmation = (state, action, value) => {
	const current = (getIn([action.collection, "mappings"], state.collections) || [])
		.map((vm) => ({...vm, confirmed: action.propertyField === vm.property ? value : vm.confirmed}));
	const newCollections = setIn([action.collection, "mappings"], current, state.collections);

	return {...state, collections: newCollections};
};

const setValueMapping = (state, action) => {
	const newCollections = setIn([action.collection, "mappings", getMappingIndex(state, action), "valueMappings", action.timValue],
		action.mapValue, state.collections);

	return {...state, collections: newCollections};
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "UPLOAD":
			return {...state, collections: scaffoldCollectionMappings()};

		case "MAP_COLLECTION_ARCHETYPE":
			return mapCollectionArchetype(state, action);

		case "SET_FIELD_MAPPING":
			return upsertFieldMapping(state, action);

		case "SET_DEFAULT_VALUE":
			return setDefaultValue(state, action);

		case "CONFIRM_FIELD_MAPPINGS":
			return setFieldConfirmation(state, action, true);

		case "UNCONFIRM_FIELD_MAPPINGS":
			return setFieldConfirmation(state, action, false);

		case "SET_VALUE_MAPPING":
			return setValueMapping(state, action);
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