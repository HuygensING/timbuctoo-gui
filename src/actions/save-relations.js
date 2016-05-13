import { saveNewEntity, deleteEntity } from "./crud";

// Save relations described in relationData
// a) create all relations which are relationData but not in data["@relations"]
// b) delete all relations which are in data["@relations"] but not in relationData
// c) ignore all relations which are in both
const saveRelations = (data, relationData, fieldDefs, token, vreId, next) => {

	// Returns the domain based on the fieldDefinitions and the relation key (i.e. "hasBirthPlace")
	const makeNewRelationArgs = (relation, key) => {
		const fieldDef = fieldDefs.find((def) => def.name === key);
		return [
			fieldDef.relation.relationCollection, // domain
			{
				"@type": fieldDef.relation.relationCollection.replace(/s$/, ""),
				"^sourceId": fieldDef.relation.direction === "IN" ? relation.id : data._id,
				"^sourceType": data["@type"],
				"^targetId": fieldDef.relation.direction === "IN" ? data._id : relation.id,
				"^targetType": fieldDef.relation.targetCollection.replace(/s$/, ""),
				"^typeId": fieldDef.relation.relationTypeId,
				accepted: true
			}
		];
	};

	// Constructs an array of arguments for saving new relations:
	// [
	//   ["wwrelations", { ... }],
	//   ["wwrelations", { ... }],
	// ]
	const newRelations = Object.keys(relationData).map((key) =>
		relationData[key]
			// Filters out all relations which are not already in data["@relations"]
			.filter((relation) => (data["@relations"][key] || []).map((origRelation) => origRelation.id).indexOf(relation.id) < 0)
			// Make argument array for new relations: ["wwrelations", { ... }]
			.map((relation) => makeNewRelationArgs(relation, key))
		// Flatten nested arrays
		).reduce((a, b) => a.concat(b), []);

	// Constructs an array of arguments for deleting existing relations:
	// [
	//   ["wwrelations", ":relationId"],
	//   ["wwrelations", ":relationId"],
	// ]
	const deleteRelations = Object.keys(data["@relations"]).map((key) =>
		data["@relations"][key]
			// Filters out all relations which still in data["@relations"] but not in relationData
			.filter((origRelation) => (relationData[key] || []).map((relation) => relation.id).indexOf(origRelation.id) < 0)
			// Make argument array for deleted relations
			.map((relation) => [fieldDefs.find((def) => def.name === key).relation.relationCollection, relation.relationId])
		// Flatten nested arrays
		).reduce((a, b) => a.concat(b), []);

	// Combines saveNewEntity and deleteEntity instructions into promises
	const promises = newRelations
		// Map newRelations to promised invocations of saveNewEntity
		.map((args) => new Promise((resolve, reject) => saveNewEntity(...args, token, vreId, resolve, reject) ))
		// Map deleteRelations to promised invocations of deleteEntity
		.concat(deleteRelations.map((args) => new Promise((resolve, reject) => deleteEntity(...args, token, vreId, resolve, reject))));

	// Invoke all CRUD operations for the relations
	Promise.all(promises).then(next, next);
};

export default saveRelations;