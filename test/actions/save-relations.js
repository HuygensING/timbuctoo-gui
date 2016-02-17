import sinon from "sinon";
import expect from "expect";
import server from "../../src/actions/server";
import saveRelations from "../../src/actions/save-relations";

describe("saveRelations v4", () => { //eslint-disable-line no-undef

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
			try {
				const payload = JSON.parse(options.body);
				const relType = payload["@type"];
				counts[relType]++;
				expect(options.method).toEqual("POST");
				if(relType === "relTypeA") {
					expect(options.url.replace(/^\/api\/v[^\/]+\//, "")).toEqual("domain/relTypeAs");
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
					expect(options.url.replace(/^\/api\/v[^\/]+\//, "")).toEqual("domain/relTypeBs");
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

	it("should delete rejected relations with DELETE", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {
			"relNameA": [{accepted: true, id: "A_1", relationId: "REL_1"}]
		}};
		const relationData = {"relNameA": []};
		const fieldDefs = [{name: "relNameA", relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}}];


		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				expect(options.method).toEqual("DELETE");
				expect(options.url.replace(/^\/api\/v[^\/]+\//, "")).toEqual(`domain/${fieldDefs[0].relation.type}s/${data["@relations"].relNameA[0].relationId}`);
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

	it("should add and delete in one go", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entityID", "@relations": {
			"relNameA": [{accepted: true, id: "A_2", relationId: "REL_2"}]
		}};
		const relationData = {"relNameA": [{accepted: true, id: "A_1"}]};
		const fieldDefs = [{name: "relNameA", relation: { type: "relTypeA", isInverseName: false, sourceType: "document", targetType: "person", typeId: "typeID"}}];

		let counts = 0;
		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				counts++;
				if(counts === 1) {
					expect(options.method).toEqual("POST");
				} else if(counts === 2) {
					expect(options.method).toEqual("DELETE");
				}
				accept();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		saveRelations(data, relationData, fieldDefs, "TOKEN", "VREID", () => {
			try {
				sinon.assert.calledTwice(server.performXhr);
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