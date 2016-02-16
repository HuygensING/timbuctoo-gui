import clone from "clone-deep";
import setIn from "./util/set-in";

// Skeleton base data per field definition
const initialData = {
	names: [],
	multiselect: [],
	links: [],
	keyword: [],
	text: "",
	string: "",
	select: "",
	datable: ""
};

// Return the initial data for the type in the field definition
const initialDataForType = (fieldDef) =>
	fieldDef.defaultValue || (fieldDef.type === "relation" || fieldDef.type === "keyword" ? {} : initialData[fieldDef.type]);

// Return the initial name-key for a certain field type
const nameForType = (fieldDef) =>
	fieldDef.type === "relation" || fieldDef.type === "keyword" ? "@relations" : fieldDef.name;


// Create a new empty entity based on the fieldDefinitions
const makeSkeleton = (fieldDefs, domain) =>
	fieldDefs
		.map((fieldDef) => [nameForType(fieldDef), initialDataForType(fieldDef)])
		.concat([["@type", domain]])
		.reduce((obj, cur) => {
			obj[cur[0]] = cur[1];
			return obj;
		}, {});

let initialState = {
	data: null,
	domain: null,
	fieldDefinitions: null
};

export default function(state=initialState, action) {
	switch (action.type) {
		case "NEW_ENTITY":
			return {...state, ...{
				data: makeSkeleton(action.fieldDefinitions, action.domain),
				domain: action.domain,
				fieldDefinitions: action.fieldDefinitions
			}};

		case "RECEIVE_ENTITY":
			return {...state, ...{
				data: action.data,
				domain: action.domain,
				fieldDefinitions: action.fieldDefinitions
			}};

		case "SET_ENTITY_FIELD_VALUE":
			return {...state, ...{
				data: setIn(action.fieldPath, action.value, clone(state.data))
			}};
	}

	return state;
}