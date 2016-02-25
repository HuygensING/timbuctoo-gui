import testQuery from "./test-query";


let parseRelation, parseProp, parseEntity;

parseProp = (prop) => `has("${prop.name}", "${prop.value}")`;

parseRelation = (rel) => [`both("${rel.name}")`, parseEntity(rel.entity)];

parseEntity = (ent) => {
	const props = (ent.data["@properties"] || []).map((p) => parseProp(p));
	const rels = (ent.data["@relations"] || []).map((r) => parseRelation(r));

	const propQ = props.length === 0 ? "" :
		props.length === 1 ? `.${props[0]}` :
		`.and(${props.map((p) => "__." + p).join(", ")})`;
	
	const relQ = rels.length === 0 ? "" :
		rels.length === 1 ? `__.${rels[0][0]}${rels[0][1]}` :
		`.union(${rels.map((r) => "__." + r[0] + r[1]).join("")})`;

	return [propQ, relQ];
}

console.log(parseEntity(testQuery.entity));

