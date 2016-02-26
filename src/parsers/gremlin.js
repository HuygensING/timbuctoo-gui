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

const parseRelation = (rel, relName, path) => `bothE("${relName}").otherV()${parseEntity(rel.entity, path)}`;

const getRelationName = (relName, fieldDefinitions) => fieldDefinitions.filter((f) => f.name === relName)[0].relation.regularName;

parseEntity = (ent, path = []) => {
	const props = (ent.data["@properties"] || []).map((p) => MAP.parseProp(p, ent.domain));
	const rels = (ent.data["@relations"] || []).map((r, i) => parseRelation(r, getRelationName(r.name, ent.fieldDefinitions), path.concat(["entity", "data", "@relations", i])));

	const propQ = props.length === 0 ? "" :
		props.length === 1 ? `.${props[0]}` :
		`.and(${props.map((p) => "__." + p).join(", ")})`;

	const relAndQ = rels.length === 0 ? "" :
		rels.length === 1 ? `.${rels[0]}` :
		`.and(${rels.map((r) => r).join(", ")}).union(${rels.map((r) => r).join(", ")})`;

	const asQ = path.length ? `.as("${path.join("|")}")` : `.as("result")`;
	return asQ + propQ + relAndQ;
};

const parseQuery = (query) => {
	let selectVal = query.pathToSelectedEntity.length ? query.pathToSelectedEntity.join("|") : "result";
	return [
		`${MAP.identity(query.entity.domain)}${parseEntity(query.entity)}.select("${selectVal}").dedup().range(0,10)`,
		`${MAP.identity(query.entity.domain)}${parseEntity(query.entity)}.select("${selectVal}").dedup().count()`
	];
};

export default parseQuery;