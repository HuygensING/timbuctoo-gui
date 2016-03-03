import clone from "../util/clone-deep";
import getIn from "../util/get-in";

let parseEntity;

const v2UnquotedPropVals = ["wwperson_children"];
const quoteProp = (domain, prop, val) => v2UnquotedPropVals.indexOf(`${domain}_${prop.name}`) > -1 ? `"${val}"` : `"\\"${val}\\""`;

const identity = (domain) => `g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"${domain}\\"")}`;

const parsePropVal = (prop, val, domain) => `has("${domain}_${prop.name}").filter{it.get().property("${domain}_${prop.name}").value().contains(${quoteProp(domain, prop, val)})}`;

const parseProp = (prop, domain) => {
	if(prop.or.length === 1) { return parsePropVal(prop, prop.or[0].value, domain); }
	return `or(${prop.or.map((pv) => parsePropVal(prop, pv.value, domain)).join(", ")})`;
};

const parseRelation = (rel, relName, path, addAlias = true) => `${rel.direction}E("${relName}")${addAlias ? `.as("${path.join("|")}")` : ""}.otherV()${parseEntity(rel.entity, path.concat("entity"), addAlias)}`;

const parseProps = (props, domain) => {
	if(props.length === 0) { return ""; }
	if(props.length === 1) { return `.${parseProp(props[0].value, domain)}`; }
	return `.and(${props.map((p) => parseProp(p.value, domain)).join(", ")})`;
};

const parseRelations = (rels, ent, path) => {
	if(rels.length === 0) { return ""; }
	if(rels.length === 1) { return `.${parseRelation(rels[0].value, rels[0].value.name, path.concat(["and", rels[0].index]))}`; }
	return `.and(${rels.map((r) => parseRelation(r.value, r.value.name, path.concat(["and", r.index]), false)).join(", ")})` +
		`.union(${rels.map((r) => parseRelation(r.value, r.value.name, path.concat(["and", r.index]))).join(", ")})`;
};

parseEntity = (ent, path = ["entity"], aliasSelf = true) => {
	const propFilters = ent.and
		.map((d, i) => { return { index: i, value: d }; })
		.filter((f) => f.value.type === "property");

	const relFilters = ent.and
		.map((d, i) => { return { index: i, value: d }; })
		.filter((f) => f.value.type === "relation");

	const propQ = parseProps(propFilters, ent.domain);
	const relQ = parseRelations(relFilters, ent, path);

	if(aliasSelf) { return (path.length ? `.as("${path.join("|")}")` : `.as("result")`) + propQ + relQ; }

	return propQ + relQ;
};

const parseQuery = (query) => {
	let path = query.pathToQuerySelection ? clone(query.pathToQuerySelection) : [];

	if(getIn(path, query) && getIn(path, query).type === "property") { path.pop(); path.pop(); }
	else if(getIn(path, query) && getIn(path, query).type === "value") { path.pop(); path.pop(); path.pop(); path.pop(); }

	let selectVal = path.length ? path.join("|") : "result";
	return [
		`${identity(query.entity.domain)}${parseEntity(query.entity)}.select("${selectVal}").dedup().range(0,10)`,
		`${identity(query.entity.domain)}${parseEntity(query.entity)}.select("${selectVal}").dedup().count()`
	];
};

export default parseQuery;