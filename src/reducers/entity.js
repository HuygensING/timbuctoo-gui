const dataTypes = {
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
	fieldDef.type === "relation" ? {} : dataTypes[fieldDef.type];

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
			state = {...state, ...{
				data: makeSkeleton(action.fieldDefinitions),
				domain: action.domain,
				fieldDefinitions: action.fieldDefinitions
			}};

			break;
	}

	return state;
}