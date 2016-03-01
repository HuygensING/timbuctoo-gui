/*import sinon from "sinon";
import expect from "expect";
import server from "../../../src/actions/server";
import saveRelations from "../../../src/actions/v2.1/save-relations";
import config from "../../../src/config";


describe("saveRelations v2.1", () => { //eslint-disable-line no-undef

	it("should save new relations with POST", (done) => { //eslint-disable-line no-undef
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


//      "name": "isPersonQuotedIn",
//      "type": "relation",
//      "quicksearch": "\/v2.1\/domain\/wwdocuments\/autocomplete",
//      "relation": {
//        "direction": "OUT",
//        "outName": "isPersonQuotedIn",
//        "inName": "quotesPerson",
//        "targetCollection": "wwdocuments",
//        "relationCollection": "wwrelations",
//        "relationTypeId": "2586f43a-49ca-45b9-9c00-32008eecb9d5"
//      }

//		const relationSaveData = {
//			"@type": fieldDef.relation.relationCollection.replace(/s$/, ""), // check
//			"^sourceId": fieldDef.relation.direction === "IN" ? relation.id : data._id, // check
//			"^sourceType": fieldDef.relation.direction === "IN" ? targetType : sourceType, // check
//			"^targetId": fieldDef.relation.direction === "IN" ? data._id : relation.id, // check
//			"^targetType": fieldDef.relation.direction === "IN" ? sourceType : targetType,
//			"^typeId": fieldDef.relation.relationTypeId, // check
//			accepted: accepted
//		};


		const fieldDefs = [
			{
				name: "relNameA",
				relation: { relationCollection: "relTypeA", direction: "OUT", sourceType: "document", targetCollection: "person", typeId: "typeID"}
			},
			{
				name: "relNameB",
				relation: { relationCollection: "relTypeB", direction: "IN", sourceType: "document", targetCollection: "person", typeId: "typeID"}
			}
		];

		const counts = {relTypeA: 0, relTypeB: 0};

		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				const payload = JSON.parse(options.body);
				const relType = payload["@type"];
				counts[relType]++;
				expect(options.method).toEqual("POST");
				if(relType === "relTypeA") {
					expect(options.url).toEqual(`${config.apiUrl[config.apiVersion]}/domain/relTypeAs`);
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
					expect(options.url).toEqual(`${config.apiUrl[config.apiVersion]}/domain/relTypeBs`);
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
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			try {
				sinon.assert.calledThrice(server.performXhr);
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});
	});

	it("should delete rejected relations with PUT", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {
			"relNameA": [{accepted: true, id: "A_1", relationId: "REL_1"}]
		}};
		const relationData = {"relNameA": []};
		const fieldDefs = [{name: "relNameA", relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}}];


		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				const payload = JSON.parse(options.body);
				expect(options.method).toEqual("PUT");
				expect(payload).toEqual({
					"@type": "relTypeA",
					"^sourceId": "entityID",
					"^sourceType": "document",
					"^targetId": `A_1`,
					"^targetType": "person",
					"^typeId": "typeID",
					"_id": "REL_1",
					"accepted": false
				});
				expect(options.url).toEqual(`${config.apiUrl[config.apiVersion]}/domain/${fieldDefs[0].relation.type}s/${data["@relations"].relNameA[0].relationId}`);
				accept();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			try {
				sinon.assert.calledOnce(server.performXhr);
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});
	});

	it("should reaccept previously rejected relations with PUT", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {
			"relNameA": [{accepted: false, id: "A_1", relationId: "REL_1"}]
		}};
		const relationData = {"relNameA": [{accepted: true, id: "A_1", relationId: "REL_1"}]};
		const fieldDefs = [{name: "relNameA", relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}}];

		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				const payload = JSON.parse(options.body);
				expect(options.method).toEqual("PUT");
				expect(payload).toEqual({
					"@type": "relTypeA",
					"^sourceId": "entityID",
					"^sourceType": "document",
					"^targetId": `A_1`,
					"^targetType": "person",
					"^typeId": "typeID",
					"_id": "REL_1",
					"accepted": true
				});
				expect(options.url).toEqual(`${config.apiUrl[config.apiVersion]}/domain/${fieldDefs[0].relation.type}s/${data["@relations"].relNameA[0].relationId}`);
				accept();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			try {
				sinon.assert.calledOnce(server.performXhr);
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});
	});

	it("should add, delete and readd in one go", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {
			"relNameA": [{accepted: false, id: "A_1", relationId: "REL_1"}, {accepted: true, id: "A_2", relationId: "REL_2"}]
		}};
		const relationData = {"relNameA": [{accepted: true, id: "A_1"}, {accepted: true, id: "A_3"}]};
		const fieldDefs = [{name: "relNameA", relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}}];

		let counts = 0;
		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				const payload = JSON.parse(options.body);
				counts++;
				if(counts === 1) {
					expect(options.method).toEqual("POST");
				} else if(counts === 2) {
					expect(options.method).toEqual("PUT");
					expect(payload.accepted).toEqual(true);
				} else if(counts === 3) {
					expect(options.method).toEqual("PUT");
					expect(payload.accepted).toEqual(false);
				}
				accept();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			try {
				sinon.assert.calledThrice(server.performXhr);
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});
	});

	it("should not send updates to the server if there are no changes", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {
			"relNameA": [{accepted: true, id: "A_1", relationId: "REL_1"}]
		}};
		const relationData = {"relNameA": [{accepted: true, id: "A_1", relationId: "REL_1"}]};
		const fieldDefs = [{name: "relNameA", relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}}];
		sinon.stub(server, "performXhr");

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			try {
				sinon.assert.notCalled(server.performXhr);
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});
	});

	it("should handle server exceptions", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {}};
		const relationData = {"relNameA": [{accepted: true, id: "A_1"}]};
		const fieldDefs = [{name: "relNameA", relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}}];

		sinon.stub(server, "performXhr", (options, accept, reject) => {
			reject();
		});

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			server.performXhr.restore();
			done();
		});
	});
});
*/