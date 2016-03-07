import clone from "../util/clone-deep";
import getIn from "../util/get-in";

let parseEntities;

const v2UnquotedPropVals = ["wwperson_children", "wwcollective_type"];
const quoteProp = (domain, prop, val) => v2UnquotedPropVals.indexOf(`${domain}_${prop.name}`) > -1 ? `"${val}"` : `"\\"${val}\\""`;

const identity = (domain) => `g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"${domain}\\"")}`;

const parsePropVal = (prop, val, domain) =>
	prop.name === "tim_id" ?
		`has("tim_id", "${val}")`
		: `has("${domain}_${prop.name}").filter{it.get().property("${domain}_${prop.name}").value().contains(${quoteProp(domain, prop, val)})}`;

const parseProp = (prop, domain) => {
	if(prop.or.length === 1) { return parsePropVal(prop, prop.or[0].value, domain); }
	return `or(${prop.or.map((pv) => parsePropVal(prop, pv.value, domain)).join(", ")})`;
};


const parseProps = (props, domain) => {
	if(props.length === 0) { return ""; }
	if(props.length === 1) { return `.${parseProp(props[0].value, domain)}`; }
	return `.and(${props.map((p) => parseProp(p.value, domain)).join(", ")})`;
};

const parseRelation = (rel, relName, path, addAlias = true) =>
	`${rel.direction}E("${relName}")${addAlias ? `.as("${path.join("|")}")` : ""}.otherV()${parseEntities(rel.or, path.concat(["or"]))}`;


const parseRelations = (rels, ent, path) => {
	if(rels.length === 0) { return ""; }
	const relQs = rels
		.map((r) => `__.${parseRelation(r.value, r.value.name, path.concat(["and", r.index]), false)}`);

	const aliasedRelQs = rels
		.map((r) => `__.${parseRelation(r.value, r.value.name, path.concat(["and", r.index]))}.as("${path.concat(r.index).join("|")}")`);

	return `.and(${relQs.join(", ")}).union(${aliasedRelQs.join(", ")})`;
};


const parseEntity = (ent, path = ["or", 0]) => {
	const propFilters = ent.and
		.map((d, i) => { return { index: i, value: d }; })
		.filter((f) => f.value.type === "property");

	const relFilters = ent.and
		.map((d, i) => { return { index: i, value: d }; })
		.filter((f) => f.value.type === "relation");

	const propQ = parseProps(propFilters, ent.domain);
	const relQ = parseRelations(relFilters, ent, path);

	return propQ + relQ;
};


parseEntities = (queries, path = ["or"]) => {

	const entityQs = queries
		.map((q, i) => parseEntity(q, path.concat(i)))
		.map((q) => `__${q === "" ? "()" : q}`);

	const aliasedEntityQs = queries
		.map((q, i) => parseEntity(q, path.concat(i)))
		.map((q, i) => `__().as("${path.concat(i).join("|")}")${q}`);

	return `.as("${path.join("|")}").or(${entityQs.join(", ")}).union(${aliasedEntityQs.join(", ")})`;
};




const parseQuery = (query) => {
	let path = query.pathToQuerySelection ? clone(query.pathToQuerySelection) : [];

	if(getIn(path, query) && getIn(path, query).type === "property") { path.pop(); path.pop(); }
	else if(getIn(path, query) && getIn(path, query).type === "value") { path.pop(); path.pop(); path.pop(); path.pop(); }

	let selectVal = path.length ? path.join("|") : "result";
	return [
		`${identity(query.or[0].domain)}${parseEntities(query.or)}.select("${selectVal}").dedup().range(0,10)`,
		`${identity(query.or[0].domain)}${parseEntities(query.or)}.select("${selectVal}").dedup().count()`
	];
};

const parsers = {
	parseGremlin: parseQuery
};

export default parseQuery;
export { parsers };
