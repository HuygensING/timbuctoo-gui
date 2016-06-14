import setIn from "./set-in";

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

const scaffoldVariableDesc = (name) => ({
	identifyingColumn: false,
	importValue: false,
	name: name.replace(/\s+/g, "_"),
	type: "text",
	confirmed: false,
	typeSpec: {}
});

const scaffoldSheets = (state) => {
	const sheets = [{
		collection: "mockpersons",
		rows: [
			["ID", "Voornaam", "tussenvoegsel", "Achternaam", "GeschrevenDocument", "Meegeschreven", "Is getrouwd met"],
			["1", "Jan", "", "Jansen", "Tekst 1", "Tekst 2", null],
			["2", "Klaas", "", "Klaassen", "Tekst 2", null, null],
			["3", "Ina", "van der", "Poel - Jansen", null, null, "1"]
		],
		variables: {
			ID: scaffoldVariableDesc("ID"),
			Voornaam: scaffoldVariableDesc("Voornaam"),
			tussenvoegsel: scaffoldVariableDesc("tussenvoegsel"),
			Achternaam: scaffoldVariableDesc("Achternaam"),
			GeschrevenDocument: scaffoldVariableDesc("GeschrevenDocument"),
			Meegeschreven: scaffoldVariableDesc("Meegeschreven"),
			"Is getrouwd met": scaffoldVariableDesc("Is getrouwd met")
		},
		extendsCollection: true,
		archetypeName: null
	},
	{
		collection: "mockdocuments",
		rows: [
			["titel", "datum", "referentie", "url"],
			["Tekst 1", "1850", "voorbeeld", "http://example.com"],
			["Tekst 2", "1860", null, null]
		],
		variables: {
			titel: scaffoldVariableDesc("titel"),
			datum: scaffoldVariableDesc("datum"),
			url: scaffoldVariableDesc("url"),
			referentie: scaffoldVariableDesc("referentie")
		},
		extendsCollection: true,
		archetypeName: null
	}];

	return {
		...state,
		sheets: sheets,
		activeCollection: "mockpersons"
	};
};

const updateVariable = (state, key, actionValue) => {
	const sheetIndex = state.sheets.map((sheet) => sheet.collection).indexOf(state.activeCollection);
	const value = key === "name" ? actionValue.replace(/\s+/g, "_") : actionValue;

	let newSheets = setIn([sheetIndex, "variables", state.activeVariable, key], value, state.sheets);
	if (key === "type") {
		if (["names", "altnames", "links"].indexOf(value) > -1) {
			newSheets = setIn([sheetIndex, "variables", state.activeVariable, "name"], value, newSheets);
		}
		if (defaultTypeSpecs[value]) {
			newSheets = setIn([sheetIndex, "variables", state.activeVariable, "typeSpec"], defaultTypeSpecs[value], newSheets);
		} else {
			newSheets = setIn([sheetIndex, "variables", state.activeVariable, "typeSpec"], {}, newSheets);
		}
	}


	if (key !== "confirmed") {
		newSheets = setIn([sheetIndex, "variables", state.activeVariable, "confirmed"], false, newSheets);
	}

	return {...state, sheets: newSheets};
};

const updateVariableTypeSpec = (state, key, value) => {
	const sheetIndex = state.sheets.map((sheet) => sheet.collection).indexOf(state.activeCollection);
	let newSheets = setIn([sheetIndex, "variables", state.activeVariable, "typeSpec", key], value, state.sheets);

	if (key !== "confirmed") {
		newSheets = setIn([sheetIndex, "variables", state.activeVariable, "confirmed"], false, newSheets);
	}

	if (key === "linksToOtherSheet") {
		newSheets = setIn([sheetIndex, "variables", state.activeVariable, "typeSpec", "targetCollection"], null, newSheets);
		newSheets = setIn([sheetIndex, "variables", state.activeVariable, "typeSpec", "relationType"], null, newSheets);
	}

	if (key === "targetCollection") {
		newSheets = setIn([sheetIndex, "variables", state.activeVariable, "typeSpec", "relationType"], null, newSheets);
	}

	if (key === "relationType") {
		newSheets = setIn([sheetIndex, "variables", state.activeVariable, "name"], value, newSheets);

	}

	return {...state, sheets: newSheets};
};

const initialState = {
	sheets: [],
	activeCollection: null,
	activeVariable: null
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "UPLOAD":
			return scaffoldSheets(state);
		case "SET_ACTIVE_COLLECTION":
			return {...state, activeCollection: action.collection, activeVariable: null};
		case "SET_ACTIVE_VARIABLE":
			return {...state, activeVariable: action.variable};
		case "UPDATE_VARIABLE":
			return updateVariable(state, action.key, action.value);

		case "UPDATE_COLLECTION":
			const sheetIndex = state.sheets.map((sheet) => sheet.collection).indexOf(action.collection);
			const newSheets = setIn([sheetIndex, action.key], action.value, state.sheets);
			return {...state, sheets: newSheets };


		case "UPDATE_VARIABLE_TYPE_SPEC":
			return updateVariableTypeSpec(state, action.key, action.value);
	}

	return state;
}