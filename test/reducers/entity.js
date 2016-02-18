import expect from "expect";
import store from "../../src/store";


describe("entity reducer", () => { //eslint-disable-line no-undef

	it("should clear the entity data after SET_VRE", (done) => { //eslint-disable-line no-undef
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().entity).toEqual({
					data: null,
					domain: null,
					fieldDefinitions: null,
					errorMessage: null
				});
				done();
			} catch(e) {
				done(e);
			}
		});

		store.dispatch({type: "SET_VRE", vreId: "WomenWriters", collections: ["foo", "bar"]});
	});

});