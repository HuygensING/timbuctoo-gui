import { saveNewEntity, deleteEntity } from "./crud";

const saveRelations = (data, relationData, fieldDefs, token, vreId, next) => {
	const makeNewRelationArgs = (relation, key) => {
		const fieldDef = fieldDefs.find((def) => def.name === key);

		return [
			fieldDef.relation.type, // domain
			{
				"@type": fieldDef.relation.type,
				"^sourceId": fieldDef.relation.isInverseName ? relation.id : data._id,
				"^sourceType": fieldDef.relation.isInverseName ? fieldDef.relation.targetType : fieldDef.relation.sourceType,
				"^targetId": fieldDef.relation.isInverseName ? data._id : relation.id,
				"^targetType": fieldDef.relation.isInverseName ? fieldDef.relation.sourceType : fieldDef.relation.targetType,
				"^typeId": fieldDef.relation.typeId,
				accepted: true
			}
		];
	};

	const newRelations = Object.keys(relationData).map((key) =>

		relationData[key]
			.filter((relation) => (data["@relations"][key] || []).map((origRelation) => origRelation.id).indexOf(relation.id) < 0)
			.map((relation) => makeNewRelationArgs(relation, key))

	).reduce((a, b) => a.concat(b), []);


	const deleteRelations = Object.keys(data["@relations"]).map((key) =>

		data["@relations"][key]
			.filter((origRelation) => (relationData[key] || []).map((relation) => relation.id).indexOf(origRelation.id) < 0)
			.map((relation) => [fieldDefs.find((def) => def.name === key).relation.type, relation.relationId])

	).reduce((a, b) => a.concat(b), []);

	const promises = newRelations
		.map((args) => new Promise((resolve) => saveNewEntity(...args, token, vreId, resolve) ))
		.concat(deleteRelations.map((args) => new Promise((resolve) => deleteEntity(...args, token, vreId, resolve))));

	Promise.all(promises).then(next);
};

export default saveRelations;