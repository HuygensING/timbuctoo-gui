import expect from "expect";
import clone from "../../src/util/clone-deep";
import queriesReducer from "../../src/reducers/queries";

const sampleQuery = {
	domain: "wwperson",
	deleted: false,
	pathToQuerySelection: ["or", 0, "and", 0],

	or: [{
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
	}]
};


describe("queries reducer", () => { //eslint-disable-line no-undef
	let relationTestQuery;

	beforeEach(() => { //eslint-disable-line no-undef
		relationTestQuery = clone(sampleQuery);
		relationTestQuery.or[0].and.push(
			{
				type: "relation",
				name: "isRelatedTo",
				or: [{ "type": "entity", "domain": "wwdocument", "or": []}]
			}
		);
		relationTestQuery.pathToQuerySelection = ["or", 0, "and", 1, "or", 0];
	});

	it("should make a new query with SELECT_QUERY if queries does not have a query at action.queryIndex", () => { //eslint-disable-line no-undef
		const queries = [];
		const domain = "dom";
		const newQuery = {
			domain: domain,
			deleted: false,
			pathToQuerySelection: ["or", 0],
			position: undefined,
			name: "",
			or: [{type: "entity", domain: domain, and: []}]
		};

		const beforeState = {currentQuery: -1, queries: queries};

		const expectedState = {
			currentQuery: 0,
			queries: [newQuery]
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
			queries: [sampleQuery]
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
		expectedQuery.pathToQuerySelection = ["or", 0, "and", "0", "or", 0];

		const expectedState = {
			currentQuery: 0,
			queries: [expectedQuery]
		};

		const action = {
			type: "SET_QUERY_PATH",
			path: ["or", 0, "and", "0", "or", 0]
		};

		const actual = queriesReducer(beforeState, action);
		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});

	it("should immutably SET_QUERY_FIELD_VALUE", () => {  //eslint-disable-line no-undef
		const queries = [{}, sampleQuery];
		const beforeState = { currentQuery: 1, queries: queries };
		const expectedQuery = clone(sampleQuery);

		expectedQuery.or[0].and[0].value = "MALE";

		const expectedState = {
			currentQuery: 1,
			queries: [
				{},
				expectedQuery
			]
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
		initialQuery.pathToQuerySelection = ["or", 0];
		const queries = [{}, initialQuery];
		const beforeState = { currentQuery: 1, queries: queries };
		const expectedQuery = clone(initialQuery);

		expectedQuery.or[0].and = [
			{type: "property", name: "gender", or: [{type: "value", value: "FEMALE"}]},
			{type: "property", name: "gender", or: [{type: "value", value: "MALE"}]}
		];

		const expectedState = {
			currentQuery: 1,
			queries: [
				{},
				expectedQuery
			]
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

	it("should ADD_QUERY_FILTER to superObject when fieldPath is a negative number", () => { //eslint-disable-line no-undef
		const initialQuery = clone(sampleQuery);
		initialQuery.pathToQuerySelection = ["or", 0, "and", 0, "or", 0];
		const queries = [{}, initialQuery];
		const beforeState = { currentQuery: 1, queries: queries };
		const expectedQuery = clone(initialQuery);

		expectedQuery.or[0].and = [
			{type: "property", name: "gender", or: [{type: "value", value: "FEMALE"}, {type: "value", value: "MALE"}]}
		];

		const expectedState = {
			currentQuery: 1,
			queries: [
				{},
				expectedQuery
			]
		};

		const action = {
			type: "ADD_QUERY_FILTER",
			fieldPath: -1,
			value: {type: "value", value: "MALE"}
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
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

	it("should immutably delete a filter with DELETE_QUERY_FILTER", () => { //eslint-disable-line no-undef
		const queries = [clone(sampleQuery)];
		const beforeState = {currentQuery: 0, queries: queries};
		const expectedQuery = {
			domain: "wwperson",
			deleted: false,
			pathToQuerySelection: ["or", 0],
			or: [{
				domain: "wwperson",
				type: "entity",
				and: []
			}]
		};

		const expectedState = {
			currentQuery: 0,
			queries: [
				expectedQuery
			]
		};

		const action = {
			type: "DELETE_QUERY_FILTER",
			queryIndex: 0
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
		expect(actual.queries === queries).toEqual(false);
	});


	it("should delete a filter with one subquery with DELETE_QUERY_FILTER if the current selection is the subquery (an entity)", () => { //eslint-disable-line no-undef
		const queries = [relationTestQuery];
		const beforeState = {currentQuery: 0, queries: queries};
		const expectedQuery = {
			domain: "wwperson",
			deleted: false,
			pathToQuerySelection: ["or", 0],
			or: [{
				domain: "wwperson",
				type: "entity",
				and: [
					relationTestQuery.or[0].and[0]
				]
			}]
		};

		const expectedState = {
			currentQuery: 0,
			queries: [
				expectedQuery
			]
		};

		const action = {
			type: "DELETE_QUERY_FILTER",
			queryIndex: 0
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
	});

	it("should not delete the parent relation filter with DELETE_QUERY_FILTER if the current selection is a subquery with siblings", () => { //eslint-disable-line no-undef
		relationTestQuery.or[0].and[1].or.push({ "type": "entity", "domain": "wwdocument", "or": []});
		const queries = [relationTestQuery];
		const beforeState = {currentQuery: 0, queries: queries};
		const expectedQuery = {
			domain: "wwperson",
			deleted: false,
			pathToQuerySelection: ["or", 0],
			or: [{
				domain: "wwperson",
				type: "entity",
				and: [
					relationTestQuery.or[0].and[0],
					{ type: "relation", name: "isRelatedTo", or: [{ "type": "entity", "domain": "wwdocument", "or": []}]}
				]
			}]
		};

		const expectedState = {
			currentQuery: 0,
			queries: [
				expectedQuery
			]
		};

		const action = {
			type: "DELETE_QUERY_FILTER",
			queryIndex: 0
		};

		const actual = queriesReducer(beforeState, action);

		expect(actual).toEqual(expectedState);
	});


	it("should SET_QUERY_RESULTS" /*, () => { //eslint-disable-line no-undef
		expect(queriesReducer(
			{ some: "state", resultsPending: true },
			{ type: "SET_QUERY_RESULTS", results: "abc" }
		)).toEqual(
			{ some: "state", results: "abc", resultsPending: false }
		);
	}*/);

	it("should SET_QUERY_RESULT_COUNT", () => { //eslint-disable-line no-undef
		expect(queriesReducer(
			{ some: "state", resultCountPending: true },
			{ type: "SET_QUERY_RESULT_COUNT", count: "1" }
		)).toEqual(
			{ some: "state", resultCount: "1", resultCountPending: false }
		);
	});

	it("should SET_QUERY_RESULTS_PENDING", () => { // eslint-disable-line no-undef
		expect(queriesReducer(
			{ some: "state", resultCountPending: false, resultsPending: false, results: "asd", resultCount: "123" },
			{ type: "SET_QUERY_RESULTS_PENDING" }
		)).toEqual(
			{ some: "state", resultCountPending: true, resultsPending: true, results: null, resultCount: null }
		);
	});

});