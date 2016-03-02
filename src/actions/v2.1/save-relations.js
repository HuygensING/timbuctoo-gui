import { saveNewEntity, updateEntity } from "../crud";

const saveRelationsV21 = (data, relationData, fieldDefs, token, vreId, next) => {
	// Returns the domain based on the fieldDefinitions and the relation key (i.e. "hasBirthPlace")
	const makeRelationArgs = (relation, key, accepted = true, id = null, rev = null) => {
		const fieldDef = fieldDefs.find((def) => def.name === key);


		const sourceType = data["@type"].replace(/s$/, "").replace(/^ww/, "");
		const targetType = fieldDef.relation.targetCollection.replace(/s$/, "").replace(/^ww/, "");

		const relationSaveData = {
			"@type": fieldDef.relation.relationCollection.replace(/s$/, ""), // check
			"^sourceId": fieldDef.relation.direction === "IN" ? relation.id : data._id, // check
			"^sourceType": fieldDef.relation.direction === "IN" ? targetType : sourceType, // check
			"^targetId": fieldDef.relation.direction === "IN" ? data._id : relation.id, // check
			"^targetType": fieldDef.relation.direction === "IN" ? sourceType : targetType,
			"^typeId": fieldDef.relation.relationTypeId, // check
			accepted: accepted
		};

		if(id) { relationSaveData._id = id; }
		if(rev) { relationSaveData["^rev"] = rev; }
		return [
			fieldDef.relation.relationCollection, // domain
			relationSaveData
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
			.map((relation) => makeRelationArgs(relation, key))
		// Flatten nested arrays
		).reduce((a, b) => a.concat(b), []);


	// Reactivate previously added relations using PUT which were 'deleted' after using PUT
	const reAddRelations = Object.keys(relationData).map((key) =>
		(data["@relations"][key] || [])
			.filter((origRelation) => origRelation.accepted === false)
			.filter((origRelation) => (relationData[key] || []).filter((relation) => relation.accepted).map((relation) => relation.id).indexOf(origRelation.id) > -1)
			.map((origRelation) => makeRelationArgs(origRelation, key, true, origRelation.relationId, origRelation.rev))
		).reduce((a, b) => a.concat(b), []);

	// Deactivate previously added relations using PUT
	const deleteRelations = Object.keys(data["@relations"]).map((key) =>
		data["@relations"][key]
			.filter((origRelation) => origRelation.accepted)
			.filter((origRelation) => (relationData[key] || []).map((relation) => relation.id).indexOf(origRelation.id) < 0)
			.map((origRelation) => makeRelationArgs(origRelation, key, false, origRelation.relationId, origRelation.rev))
		).reduce((a, b) => a.concat(b), []);

	// Combines saveNewEntity and deleteEntity instructions into promises
	const promises = newRelations
		// Map newRelations to promised invocations of saveNewEntity
		.map((args) => new Promise((resolve, reject) => saveNewEntity(...args, token, vreId, resolve, reject) ))
		// Map readdRelations to promised invocations of updateEntity
		.concat(reAddRelations.map((args) => new Promise((resolve, reject) => updateEntity(...args, token, vreId, resolve, reject))))
		// Map deleteRelations to promised invocations of updateEntity
		.concat(deleteRelations.map((args) => new Promise((resolve, reject) => updateEntity(...args, token, vreId, resolve, reject))));

	// Invoke all CRUD operations for the relations
	Promise.all(promises).then(next, next);
};

export default saveRelationsV21;