const v2UnquotedPropVals = ["wwperson_children"];

const quoteProp = (domain, prop) => v2UnquotedPropVals.indexOf(`${domain}_${prop.name}`) > -1 ? `"${prop.value}"` : `"\\"${prop.value}\\""`;

const mappings = {
	v4: {
		identity: (domain) => `g.V().label("${domain}")`,
		parseProp: (prop) => `has("${prop.name}", "${prop.value}")`
	},
	"v2.1": {
		identity: (domain) => `g.V().has("isLatest", true).filter{it.get().property("types").value().contains("\\"${domain}\\"")}`,
		parseProp: (prop, domain) => `has("${domain}_${prop.name}").filter{it.get().property("${domain}_${prop.name}").value().contains(${quoteProp(domain, prop)})}`
	}
};

const MAP = mappings["v2.1"];

let parseRelation, parseEntity;


parseRelation = (rel, relName) => `both("${relName}")${parseEntity(rel.entity)}`;

const getRelationName = (relName, fieldDefinitions) => fieldDefinitions.filter((f) => f.name === relName)[0].relation.regularName;


parseEntity = (ent) => {
	const props = (ent.data["@properties"] || []).map((p) => MAP.parseProp(p, ent.domain));
	const rels = (ent.data["@relations"] || []).map((r) => parseRelation(r, getRelationName(r.name, ent.fieldDefinitions)));

	const propQ = props.length === 0 ? "" :
		props.length === 1 ? `.${props[0]}` :
		`.and(${props.map((p) => "__." + p).join(", ")})`;

	const relQ = rels.length === 0 ? "" :
		rels.length === 1 ? `.${rels[0]}` :
		`.and(${rels.map((r) => "__." + r).join(", ")})`;

	return propQ + relQ;
};

const parseQuery = (query) => [
	`${MAP.identity(query.entity.domain)}.as("result")${parseEntity(query.entity)}.select("result").dedup().range(0,10)`,
	`${MAP.identity(query.entity.domain)}.as("result")${parseEntity(query.entity)}.select("result").dedup().count()`
];

export default parseQuery;