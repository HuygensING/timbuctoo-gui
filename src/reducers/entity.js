import clone from "clone-deep";


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

const setEither = (data, deref, key, val) => {
	(deref || data)[key] = val;
	return data;
};

const setIn = (path, value, data, deref = null) =>
	path.length > 1 ?
		setIn(path, value, data, deref ? deref[path.shift()] : data[path.shift()]) :
		setEither(data, deref, path[0], value);


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