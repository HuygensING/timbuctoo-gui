import { getItem } from "./persist";


const mockPersonsHeader = ["ID", "Voornaam", "tussenvoegsel", "Achternaam", "GeschrevenDocument", "Genoemd in", "Is getrouwd met"];
const mockDocumentsHeader = ["titel", "datum", "referentie", "url"];

const scaffoldSheets = (state) => {
	const sheets = [{
		collection: "mockpersons",
		rows: [
			["1", "Jan", "", "Jansen", "Tekst 1", "Tekst 2", null],
			["2", "Klaas", "", "Klaassen", "Tekst 2", null, null],
			["3", "Ina", "van der", "Poel - Jansen", null, null, "1"]
		],
		variables: mockPersonsHeader
	},
	{
		collection: "mockdocuments",
		rows: [
			["Tekst 1", "1850", "voorbeeld", "http://example.com"],
			["Tekst 2", "1860", null, null]
		],
		variables: mockDocumentsHeader
	}];

	return {
		...state,
		sheets: sheets,
		activeCollection: "mockpersons"
	};
};



const initialState = getItem("importData") || {
	sheets: null,
	activeCollection: null
};


export default function(state=initialState, action) {
	switch (action.type) {
		case "UPLOAD":
			return scaffoldSheets(state);
		case "SET_ACTIVE_COLLECTION":
			return {...state, activeCollection: action.collection};
	}

	return state;
}