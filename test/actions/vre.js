import expect from "expect";
import sinon from "sinon";
import config from "../../src/config";
import server from "../../src/actions/server";
import {listVres, setVre} from "../../src/actions/vre";


describe("vre", () => { //eslint-disable-line no-undef

	const dispatch = (func, assert, getState = () => {}) => {
		const redispatch = (obj) => assert(obj);
		func(redispatch, getState);
	};


	it("should listVres", (done) => { //eslint-disable-line no-undef
		const list = ["a", "b", "c"];


		const finalize = (e) => {
			sinon.assert.calledOnce(server.performXhr);
			server.performXhr.restore();
			done(e);
		};

		sinon.stub(server, "performXhr", (opts, cb) => {
			try {
				expect(opts).toEqual({
					method: "GET",
					headers: {
						"Accept": "application/json"
					},
					url: `${config.apiUrl["v2.1"]}/system/vres`
				});
				cb(null, {body: JSON.stringify(list)});
			} catch (e) {
				finalize(e);
			}
		});

		dispatch(listVres(), (obj) => {
			try {
				expect(obj).toEqual({
					list: list,
					type: "LIST_VRES"
				});
				finalize();
			} catch (e) {
				finalize(e);
			}
		});
	});

	it("should setVre", (done) => { //eslint-disable-line no-undef
		const vreId = "WomenWriters";
		const collections = ["collection-data"];

		const finalize = (e) => {
			sinon.assert.calledOnce(server.performXhr);
			server.performXhr.restore();
			done(e);
		};



		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			try {
				expect(options).toEqual({
					url: `${config.apiUrl.v4}/metadata/${vreId}`,
					headers: {
						"Accept": "application/json"
					},
					method: "GET"
				});
				expect(operation).toEqual(`Fetch VRE description for ${vreId}`);
				accept(null, {statusCode: 200, body: JSON.stringify(collections)});
			} catch(e) {
				finalize(e);
			}
		});

		dispatch(setVre("WomenWriters"), (obj) => {
			try {
				expect(obj).toEqual({
					type: "SET_VRE",
					vreId: "WomenWriters",
					collections: collections
				});
				finalize();
			} catch (e) {
				finalize(e);
			}
		});
	});
});