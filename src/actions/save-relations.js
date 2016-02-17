import { saveNewEntity, deleteEntity } from "./crud";
import saveRelationsV21 from "./v2.1/save-relations";
import config from "../config";

// Save relations described in relationData
// a) create all relations which are relationData but not in data["@relations"]
// b) delete all relations which are in data["@relations"] but not in relationData
// c) ignore all relations which are in both
const saveRelations = (data, relationData, fieldDefs, token, vreId, next) => {
	if(config.apiVersion === "v2.1") {
		saveRelationsV21(data, relationData, fieldDefs, token, vreId, next);
		return;
	}
	// Returns the domain based on the fieldDefinitions and the relation key (i.e. "hasBirthPlace")
	const makeNewRelationArgs = (relation, key) => {
		const fieldDef = fieldDefs.find((def) => def.name === key);
		return [
			fieldDef.relation.type, // domain
			{
				"@type": fieldDef.relation.type,
				"^sourceId": fieldDef.relation.isInverseName ? relation.id : data._id,
				"^sourceType": fieldDef.relation.isInverseName ? fieldDef.relation.targetType : fieldDef.relation.sourceType,  // FIXME?
				"^targetId": fieldDef.relation.isInverseName ? data._id : relation.id,
				"^targetType": fieldDef.relation.isInverseName ? fieldDef.relation.sourceType : fieldDef.relation.targetType, // FIXME?
				"^typeId": fieldDef.relation.typeId,
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
			.map((relation) => [fieldDefs.find((def) => def.name === key).relation.type, relation.relationId])
		// Flatten nested arrays
		).reduce((a, b) => a.concat(b), []);

	// Combines saveNewEntity and deleteEntity instructions into promises
	const promises = newRelations
		// Map newRelations to promised invocations of saveNewEntity
		.map((args) => new Promise((resolve) => saveNewEntity(...args, token, vreId, resolve) ))
		// Map deleteRelations to promised invocations of deleteEntity
		.concat(deleteRelations.map((args) => new Promise((resolve) => deleteEntity(...args, token, vreId, resolve))));

	// Invoke all CRUD operations for the relations
	Promise.all(promises).then(next);
};

export default saveRelations;