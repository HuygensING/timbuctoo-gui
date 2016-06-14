import setIn from "./set-in";

const newVariableDesc = (variableName) => ({
	importVariable: variableName
});

const scaffoldCollectionMappings = () => ({
	mockpersons: {
		archetypeName: null,
		mappings: {}
	},
	mockdocuments: {
		archetypeName: null,
		mappings: {}
	}
});

const initialState = {
	collections: {}
};

const mapCollectionArchetype = (state, action) => {
	const newCollections = setIn(["collections", action.collection, "archetypeName"], action.value, state.collections);
	return {...state, collections: newCollections};
};

const addFieldMapping = (state, action) => {
	const newCollections = setIn(["collections", action.collection, "mappings", action.propertyField], [newVariableDesc(action.importedField)], state.collections);
	return {...state, collections: newCollections};
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "UPLOAD":
			return {...state, collections: scaffoldCollectionMappings()};

		case "MAP_COLLECTION_ARCHETYPE":
			return mapCollectionArchetype(state, action);

		case "ADD_FIELD_MAPPING":
			return addFieldMapping(state, action);
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