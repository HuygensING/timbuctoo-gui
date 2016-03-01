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

	it("should immutably SET_ENTITY_FIELD_VALUE", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const fieldDefinitions = [{name: "a", type: "string"}, {name: "c", type: "multiselect"}];

		let unsubscribe;


		unsubscribe = store.subscribe(() => {
			unsubscribe();
			const derefData = store.getState().entity.data;
			unsubscribe = store.subscribe(() => {
				unsubscribe();
				try {
					expect(store.getState().entity).toEqual({
						data: {a: "", c: ["f"], "@type": "dom"},
						domain: domain,
						fieldDefinitions: fieldDefinitions,
						errorMessage: null
					});
					expect(store.getState().entity.data === derefData).toEqual(false);
					done();
				} catch(e) {
					done(e);
				}
			});
			store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: ["c", 0], value: "f"});
		});

		store.dispatch({type: "NEW_ENTITY", domain: domain, fieldDefinitions: fieldDefinitions});
	});
});