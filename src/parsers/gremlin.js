import clone from "clone-deep";

const v2UnquotedPropVals = ["wwperson_children"];
const quoteProp = (domain, prop) => v2UnquotedPropVals.indexOf(`${domain}_${prop.name}`) > -1 ? `"${prop.value}"` : `"\\"${prop.value}\\""`;
const mappings = {
	"v2.1": {
		identity: (domain) => `g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"${domain}\\"")}`,
		parseProp: (prop, domain) => `has("${domain}_${prop.name}").filter{it.get().property("${domain}_${prop.name}").value().contains(${quoteProp(domain, prop)})}`
	}
};

const MAP = mappings["v2.1"];

let parseEntity;

const parseRelation = (rel, relName, path, addAlias = true) => `${rel.direction}E("${relName}")${addAlias ? `.as("${path.join("|")}")` : ""}.otherV()${parseEntity(rel.entity, path.concat("entity"), addAlias)}`;


const parseProps = (props, domain) => {
	if(props.length === 0) { return ""; }
	if(props.length === 1) { return `.${MAP.parseProp(props[0].value, domain)}`; }
	return `.and(${props.map((p) => MAP.parseProp(p.value, domain)).map((p) => "__." + p).join(", ")})`;
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
	if(path.length > 2 && path[path.length - 2] === "@properties") {
		path.pop();
		path.pop();
		path.pop();
	}
	let selectVal = path.length ? path.join("|") : "result";
	return [
		`${MAP.identity(query.entity.domain)}${parseEntity(query.entity)}.select("${selectVal}").dedup().range(0,10)`,
		`${MAP.identity(query.entity.domain)}${parseEntity(query.entity)}.select("${selectVal}").dedup().count()`
	];
};

export default parseQuery;