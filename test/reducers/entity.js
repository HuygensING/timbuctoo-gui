import expect from "expect";
import entityReducer from "../../src/reducers/entity";

describe("entity reducer", () => { //eslint-disable-line no-undef

	it("should clear the entity data after SET_VRE", () => { //eslint-disable-line no-undef
		expect(entityReducer({data: "x", domain: "y", errorMessage: "z"}, {type: "SET_VRE"})).toEqual({
			data: null,
			domain: null,
			errorMessage: null
		});
	});

	it("should immutably SET_ENTITY_FIELD_VALUE", () => { //eslint-disable-line no-undef
		const derefData = {a: "b", c: ["d", "e"]};
		const actual = entityReducer({data: derefData}, {type: "SET_ENTITY_FIELD_VALUE", fieldPath: ["c", 0], value: "f"});
		expect(actual).toEqual({data: {a: "b", c: ["f", "e"]}});
		expect(actual.data === derefData).toEqual(false);
	});
});