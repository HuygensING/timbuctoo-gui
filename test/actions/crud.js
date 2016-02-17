import sinon from "sinon";
import expect from "expect";
import server from "../../src/actions/server";
import {fetchEntity} from "../../src/actions/crud";

/* eslint no-undef: 0 */
describe("crud", () => {

	it("should fetch an entity and invoke next on success", (done) => {
		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			expect(options).toEqual({
				url: "/loc",
				headers: {
					"Accept": "application/json"
				},
				method: "GET"
			});
			expect(operation).toEqual("Fetch entity");
			accept(null, {body: JSON.stringify({data: "data"})});
		});

		fetchEntity("/loc", (data) => {
				expect(data).toEqual({data: "data"});
				done();
			}, () => { }
		);

		sinon.assert.calledOnce(server.performXhr);
		server.performXhr.restore();
	});
});