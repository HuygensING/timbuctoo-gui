import testQuery from "./test-query";


let parseRelation, parseProp, parseEntity;

parseProp = (prop) => `has("${prop.name}", "${prop.value}")`;

parseRelation = (rel) => `both("${rel.name}")${parseEntity(rel.entity)}`;

parseEntity = (ent) => {
	const props = (ent.data["@properties"] || []).map((p) => parseProp(p));
	const rels = (ent.data["@relations"] || []).map((r) => parseRelation(r));

	const propQ = props.length === 0 ? "" :
		props.length === 1 ? `.${props[0]}` :
		`.and(${props.map((p) => "__." + p).join(", ")})`;
	
	const relQ = rels.length === 0 ? "" :
		rels.length === 1 ? `.${rels[0]}` :
		`.union(${rels.map((r) => "__." + r).join(", ")})`;

	return propQ + relQ;
}

console.log(`g.V().label("${testQuery.entity.domain}")${parseEntity(testQuery.entity)}`);

/*
1)
===
g.V().label("wwperson")
.and(
	__.has("types", "AUTHOR"),
	__.has("types", "ARCHETYPE")
)
.union(
	__.both("isCreatorOf")
		.and(
			__.has("documentType", "ANTHOLOGY"),
			__.has("documentType", "UNKNOWN")
		)
		.both("isCreatedBy")
		.has("gender", "FEMALE"),

	__.both("isCreatorOf")
	  .has("documentType", "ANTHOLOGY")
	  .both("isCreatedBy")
	  .has("children", "NO")
	  .union(
		  __.both("hasProfession"),
		  __.both("hasMaritalStatus")
	  )
)
===

2)
===
g.V().label("wwperson")
.and(
	__.has("gender", "FEMALE"),
	__.has("types", "AUTHOR")
)
.union(
	__.both("isCreatorOf")
	  .has("documentType", "ARTICLE")
	  .both("isCreatedBy")
	  .has("gender", "MALE"),

	__.both("hasProfession")
)
===
*/