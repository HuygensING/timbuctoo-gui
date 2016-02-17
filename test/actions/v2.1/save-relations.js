import sinon from "sinon";
import expect from "expect";
import server from "../../../src/actions/server";
import saveRelations from "../../../src/actions/v2.1/save-relations";

describe("saveRelations v2.1", () => { //eslint-disable-line no-undef

	it("should save new relations with POST", (done) => {  //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {}};
		const relationData = {
			"relNameA": [
				{accepted: true, id: "A_1"},
				{accepted: true, id: "A_2"}
			],
			"relNameB": [
				{accepted: true, id: "B_1"}
			]
		};

		const fieldDefs = [
			{
				name: "relNameA",
				relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}
			},
			{
				name: "relNameB",
				relation: { type: "relTypeB", isInverseName: true, sourceType: "document", targetType: "person", typeId: "typeID"}
			}
		];

		const counts = {relTypeA: 0, relTypeB: 0};

		sinon.stub(server, "performXhr", (options, accept) => {
			const payload = JSON.parse(options.body);
			const relType = payload["@type"];
			counts[relType]++;
			expect(options.method).toEqual("POST");

			if(relType === "relTypeA") {
				expect(payload).toEqual({
					"@type": "relTypeA",
					"^sourceId": "entityID",
					"^sourceType": "document",
					"^targetId": `A_${counts[relType]}`,
					"^targetType": "person",
					"^typeId": "typeID",
					"accepted": true
				});
			} else {
				expect(payload).toEqual({
					"@type": "relTypeB",
					"^sourceId": "B_1",
					"^sourceType": "document",
					"^targetId": "entityID",
					"^targetType": "person",
					"^typeId": "typeID",
					"accepted": true
				});
			}

			accept();
		});

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			sinon.assert.calledThrice(server.performXhr);
			server.performXhr.restore();
			done();
		});
	});
});

/*
import { saveNewEntity, updateEntity } from "../crud";

const saveRelationsV21 = (data, relationData, fieldDefs, token, vreId, next) => {
	// Returns the domain based on the fieldDefinitions and the relation key (i.e. "hasBirthPlace")
	const makeRelationArgs = (relation, key, accepted = true, id = null, rev = null) => {
		const fieldDef = fieldDefs.find((def) => def.name === key);
		const relationSaveData = {
			"@type": fieldDef.relation.type,
			"^sourceId": fieldDef.relation.isInverseName ? relation.id : data._id,
			"^sourceType": fieldDef.relation.isInverseName ? fieldDef.relation.targetType : fieldDef.relation.sourceType, // FIXME?
			"^targetId": fieldDef.relation.isInverseName ? data._id : relation.id,
			"^targetType": fieldDef.relation.isInverseName ? fieldDef.relation.sourceType : fieldDef.relation.targetType,  // FIXME?
			"^typeId": fieldDef.relation.typeId,
			accepted: accepted
		};
		if(id) { relationSaveData._id = id; }
		if(rev) { relationSaveData["^rev"] = rev; }
		return [
			fieldDef.relation.type, // domain
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
		.map((args) => new Promise((resolve) => saveNewEntity(...args, token, vreId, resolve) ))
		// Map readdRelations to promised invocations of updateEntity
		.concat(reAddRelations.map((args) => new Promise((resolve) => updateEntity(...args, token, vreId, resolve))))
		// Map deleteRelations to promised invocations of updateEntity
		.concat(deleteRelations.map((args) => new Promise((resolve) => updateEntity(...args, token, vreId, resolve))));

	// Invoke all CRUD operations for the relations
	Promise.all(promises).then(next);
};

export default saveRelationsV21;
*/