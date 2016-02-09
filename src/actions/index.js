import store from "../store";
import fieldDefinitions from "../static/field-definitions";


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

const getFieldDescription = (domain, dispatch) =>
	dispatch({
		type: "NEW_ENTITY",
		domain: domain,
		fieldDefinitions: fieldDefinitions[domain],
		data: makeSkeleton(fieldDefinitions[domain])
	});

export default {
	onNew: (domain) => store.dispatch(redispatch => getFieldDescription(domain, redispatch))
};