import sinon from "sinon";
import expect from "expect";
import clone from "clone-deep";
import store from "../../src/store";
import server from "../../src/actions/server";
import {listVres, setVre} from "../../src/actions/vre";
import config from "../../src/config";


describe("vre", () => { //eslint-disable-line no-undef

	it("should listVres", (done) => { //eslint-disable-line no-undef
		let unsubscribe;
		const finalize = (e) => {
			unsubscribe();
			server.performXhr.restore();
			done(e);
		};

		unsubscribe = store.subscribe(() => {
			try {
				expect(store.getState().vre.list).toEqual(["a", "b", "c"]);
				finalize();
			} catch (e) {
				finalize(e);
			}
		});


		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			try {
				expect(options).toEqual({
					url: `${config.apiUrl["v2.1"]}/system/vres`,
					headers: {
						"Accept": "application/json"
					},
					method: "GET"
				});
				expect(operation).toEqual("List VREs");
				accept(null, {body: JSON.stringify(["a", "b", "c"])});
			} catch(e) {
				finalize(e);
			}
		});

		store.dispatch(listVres());
	});

	it("should setVre", (done) => { //eslint-disable-line no-undef
		const list = clone(store.getState().vre.list);
		const vreId = "WomenWriters";
		const collections = ["collection-data"];

		let unsubscribe;

		const finalize = (e) => {
			unsubscribe();
			sinon.assert.calledOnce(server.performXhr);
			server.performXhr.restore();
			done(e);
		};

		unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().vre).toEqual({
					vreId: "WomenWriters",
					collections: collections,
					list: list
				});
				finalize();
			} catch (e) {
				finalize(e);
			}
		});


		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			try {
				expect(options).toEqual({
					url: `${config.apiUrl.v4}/system/vres/${vreId}`,
					headers: {
						"Accept": "application/json"
					},
					method: "GET"
				});
				expect(operation).toEqual(`Fetch VRE description for ${vreId}`);
				accept(null, {body: JSON.stringify(collections)});
			} catch(e) {
				finalize(e);
			}
		});

		store.dispatch(setVre("WomenWriters"));
	});
});