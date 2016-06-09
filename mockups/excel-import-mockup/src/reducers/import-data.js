import setIn from "./set-in";

const scaffoldVariableDesc = (name) => ({
	identifyingColumn: false,
	importValue: false,
	name: name.replace(/\s+/g, "_"),
	type: "text"
});

const scaffoldSheets = () => [
	{
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
		}
	},
	{
		collection: "mockdocuments",
		rows: [
			["titel", "datum"],
			["Tekst 1", "1850"],
			["Tekst 2", "1860"]
		],
		variables: {
			titel: scaffoldVariableDesc("titel"),
			datum: scaffoldVariableDesc("datum")
		}
	}
];

const initialState = {
	sheets: [],
	activeCollection: null,
	activeVariable: null
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "UPLOAD":
			return {...state, sheets: scaffoldSheets() };
		case "SET_ACTIVE_COLLECTION":
			return {...state, activeCollection: action.collection, activeVariable: null};
		case "SET_ACTIVE_VARIABLE":
			return {...state, activeVariable: action.variable};
		case "UPDATE_VARIABLE":
			const sheetIndex = state.sheets.map((sheet) => sheet.collection).indexOf(state.activeCollection);
			const newSheets = setIn([sheetIndex, "variables", state.activeVariable, action.key], action.value, state.sheets);
			return {...state, sheets: newSheets};

	}

	return state;
}