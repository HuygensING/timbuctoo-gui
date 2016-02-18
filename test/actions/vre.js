import sinon from "sinon";
import expect from "expect";
import store from "../../src/store";
import server from "../../src/actions/server";
import {listVres} from "../../src/actions/vre";


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
					url: "/api/v2.1/system/vres",
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
});