import R from "ramda";


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

const initialDataForType = (fieldDef) =>
	fieldDef.type === "relation" ? {} : initialData[fieldDef.type];

const nameForType = (fieldDef) =>
	fieldDef.type === "relation" || fieldDef.type === "keyword" ? "@relations" : fieldDef.name;

const makeSkeleton = (fieldDefs) =>
	fieldDefs
		.map((fieldDef) => [nameForType(fieldDef), initialDataForType(fieldDef)])
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
				data: makeSkeleton(action.fieldDefinitions),
				domain: action.domain,
				fieldDefinitions: action.fieldDefinitions
			}};

		case "SET_ENTITY_FIELD_VALUE":
			return {...state, ...{
				data: R.assocPath(action.fieldPath, action.value, state.data)
			}};

	}

	return state;
}