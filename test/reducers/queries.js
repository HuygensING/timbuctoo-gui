import expect from "expect";
import queriesReducer from "../../src/reducers/queries";

describe("queries reducer", () => { //eslint-disable-line no-undef

	it("should SELECT_QUERY"); //eslint-disable-line no-undef

	it("should SET_QUERY_PATH"); //eslint-disable-line no-undef

	it("should SET_QUERY_FIELD_VALUE"); //eslint-disable-line no-undef

	it("should DELETE_QUERY"); //eslint-disable-line no-undef

	it("should SET_QUERY_RESULTS", () => { //eslint-disable-line no-undef
		expect(queriesReducer(
			{ some: "state", resultsPending: true },
			{ type: "SET_QUERY_RESULTS", results: "abc" }
		)).toEqual(
			{ some: "state", results: "abc", resultsPending: false }
		);
	});

	it("should SET_QUERY_RESULT_COUNT", () => { //eslint-disable-line no-undef
		expect(queriesReducer(
			{ some: "state", resultCountPending: true },
			{ type: "SET_QUERY_RESULT_COUNT", count: "1" }
		)).toEqual(
			{ some: "state", resultCount: "1", resultCountPending: false }
		);
	});

});