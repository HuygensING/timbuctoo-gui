import expect from "expect";
import store from "../../src/store";


describe("vre reducer", () => { //eslint-disable-line no-undef

	beforeEach((done) => { //eslint-disable-line no-undef
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			done();
		});

		store.dispatch({type: "SET_VRE", vreId: null, list: []});
	});

	it("should SET the vre", (done) => { //eslint-disable-line no-undef
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().vre).toEqual({
					collections: ["foo", "bar"],
					vreId: "WomenWriters",
					list: []
				});
				done();
			} catch(e) {
				done(e);
			}
		});

		store.dispatch({type: "SET_VRE", vreId: "WomenWriters", collections: ["foo", "bar"]});
	});

	it("should LIST the vres", (done) => { //eslint-disable-line no-undef
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().vre).toEqual({
					vreId: null,
					list: ["a", "b", "c"],
					collections: null
				});
				done();
			} catch(e) {
				done(e);
			}
		});

		store.dispatch({type: "LIST_VRES", list: ["a", "b", "c"]});

	});
});