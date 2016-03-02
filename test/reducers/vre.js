import expect from "expect";
import vreReducer from "../../src/reducers/vre";

describe("vre reducer", () => { //eslint-disable-line no-undef

	it("should SET the vre", () => { //eslint-disable-line no-undef

		expect(vreReducer(
			{vreId: null, list: [], collections: null},
			{type: "SET_VRE", vreId: "WomenWriters", collections: ["foo", "bar"]}
		)).toEqual({
			collections: ["foo", "bar"],
			vreId: "WomenWriters",
			list: []
		});
	});

	it("should LIST the vres", () => { //eslint-disable-line no-undef

		expect(vreReducer(
			{vreId: null, list: [], collections: null},
			{type: "LIST_VRES", list: ["a", "b", "c"]}
		)).toEqual({
			vreId: null,
			list: ["a", "b", "c"],
			collections: null
		});
	});
});