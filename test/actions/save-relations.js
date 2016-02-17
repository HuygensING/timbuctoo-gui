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
			const payload = JSON.parse(options.body);
			const relType = payload["@type"];
			counts[relType]++;

			try {
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