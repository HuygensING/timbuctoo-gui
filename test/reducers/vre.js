import expect from "expect";
import store from "../../src/store";


describe("vre reducer", () => { //eslint-disable-line no-undef

	before((done) => { //eslint-disable-line no-undef
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			done();
		});

		store.dispatch({type: "SET_VRE", vreId: null});
	});

	it("should SET the vre", (done) => { //eslint-disable-line no-undef
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().vre).toEqual({
					vreId: "WomenWriters"
				});
				done();
			} catch(e) {
				done(e);
			}
		});

		store.dispatch({type: "SET_VRE", vreId: "WomenWriters"});
	});
});