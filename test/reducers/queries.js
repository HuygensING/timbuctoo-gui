import expect from "expect";
import sinon from "sinon";
import clone from "clone-deep";

import server from "../../src/actions/server";
import queriesReducer from "../../src/reducers/queries";

const sampleQuery = {
	domain: "wwperson",
	deleted: false,
	pathToQuerySelection: ["entity", "and", 0],

	entity: {
		domain: "wwperson",
		type: "entity",
		and: [
			{
				type: "property",
				name: "gender",
				or: [
					{ type: "value", value: "FEMALE" }
				]
			}
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

	it("should make a new query with SELECT_QUERY if queries does not have a query at action.queryIndex", () => { //eslint-disable-line no-undef
		const queries = [];
		const domain = "dom";
		const newQuery = { domain: domain, deleted: false, pathToQuerySelection: ["entity"], entity: {type: "entity", domain: domain, and: []}};
		const beforeState = {currentQuery: -1, queries: queries};

		const expectedState = {
			currentQuery: 0,
			queries: [newQuery],
			resultCount: "",
			resultCountPending: true,
			resultsPending: true
		};

		const action = {
			type: "SELECT_QUERY",
			queryIndex: 0,
			domain: domain
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});

	it("should SELECT_QUERY at action.queryIndex", () => { //eslint-disable-line no-undef
		const queries = [sampleQuery];
		const beforeState = {currentQuery: -1, queries: queries};

		const expectedState = {
			currentQuery: 0,
			queries: [sampleQuery],
			resultCount: "",
			resultCountPending: true,
			resultsPending: true
		};

		const action = {
			type: "SELECT_QUERY",
			queryIndex: 0
		};

		expect(queriesReducer(beforeState, action)).toEqual(expectedState);
	});

	it("should immutably SET_QUERY_PATH", () => { //eslint-disable-line no-undef
		const queries = [sampleQuery];
		const beforeState = {currentQuery: 0, queries: queries};
		const expectedQuery = clone(sampleQuery);
		expectedQuery.pathToQuerySelection = ["entity", "and", "0", "entity"];

		const expectedState = {
			currentQuery: 0,
			queries: [expectedQuery],
			resultCount: "",
			resultCountPending: true,
			resultsPending: true
		};

		const action = {
			type: "SET_QUERY_PATH",
			path: ["entity", "and", "0", "entity"]
		};

		const actual = queriesReducer(beforeState, action);
		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});

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
			fieldPath: ["value"],
			value: "MALE"
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});

	it("should immutably ADD_QUERY_FILTER", () => { //eslint-disable-line no-undef
		const initialQuery = clone(sampleQuery);
		initialQuery.pathToQuerySelection = ["entity"];
		const queries = [{}, initialQuery];
		const beforeState = { currentQuery: 1, queries: queries };
		const expectedQuery = clone(initialQuery);

		expectedQuery.entity.and = [
			{type: "property", name: "gender", or: [{type: "value", value: "FEMALE"}]},
			{type: "property", name: "gender", or: [{type: "value", value: "MALE"}]}
		];

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
			type: "ADD_QUERY_FILTER",
			fieldPath: ["and"],
			value: {type: "property", name: "gender", or: [{type: "value", value: "MALE"}]}
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});

	it("should delete an entire query with DELETE_QUERY if the length of the pathToQuerySelection is 1", () => { //eslint-disable-line no-undef
		const initialQuery = clone(sampleQuery);
		initialQuery.pathToQuerySelection = ["entity"];
		const queries = [{}, initialQuery];
		const beforeState = { currentQuery: 1, queries: queries };
		const expectedQuery = clone(initialQuery);
		expectedQuery.deleted = true;

		const expectedState = {
			currentQuery: -1,
			queries: [{},
				expectedQuery
			]
		};

		const action = {
			type: "DELETE_QUERY",
			queryIndex: 1
		};

		const actual = queriesReducer(beforeState, action);
		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});

	it("should delete a subquery with DELETE_QUERY_FILTER if the length of the pathToQuerySelection is more than 1", () => { //eslint-disable-line no-undef
		const queries = [sampleQuery];
		const beforeState = {currentQuery: 0, queries: queries};
		const expectedQuery = {
			domain: "wwperson",
			deleted: false,
			pathToQuerySelection: ["entity"],
			entity: {
				domain: "wwperson",
				type: "entity",
				and: []
			}
		};

		const expectedState = {
			currentQuery: 0,
			queries: [
				expectedQuery
			],
			resultCount: "",
			resultCountPending: true,
			resultsPending: true
		};

		const action = {
			type: "DELETE_QUERY_FILTER",
			queryIndex: 0
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



});