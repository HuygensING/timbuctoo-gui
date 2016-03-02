import expect from "expect";
import sinon from "sinon";
import clone from "clone-deep";

import server from "../../src/actions/server";
import queriesReducer from "../../src/reducers/queries";

const sampleQuery = {
	domain: "wwperson",
	deleted: false,
	pathToQuerySelection: ["entity", "and"],

	entity: {
		domain: "wwperson",
		and: [
			{type: "property", name: "gender", value: "FEMALE"}
		]
	}
};

describe("queries reducer", () => { //eslint-disable-line no-undef

	before(() => { //eslint-disable-line no-undef
		sinon.stub(server, "fastXhr");
	});

	after(() => { //eslint-disable-line no-undef
		server.fastXhr.restore();
	});

	it("should SELECT_QUERY"); //eslint-disable-line no-undef

	it("should SET_QUERY_PATH"); //eslint-disable-line no-undef

	it("should immutably SET_QUERY_FIELD_VALUE", () => {  //eslint-disable-line no-undef
		const queries = [{}, sampleQuery];
		const beforeState = { currentQuery: 1, queries: queries };
		const expectedQuery = clone(sampleQuery);

		expectedQuery.entity.and[0].value = "MALE";

		const expectedState = {
			currentQuery: 1,
			queries: [
				{},
				expectedQuery
			],
			resultCount: "",
			resultCountPending: true,
			resultsPending: true
		};

		const action = {
			type: "SET_QUERY_FIELD_VALUE",
			fieldPath: [0, "value"],
			value: "MALE"
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});


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

	it("should DELETE_QUERY"); //eslint-disable-line no-undef

});