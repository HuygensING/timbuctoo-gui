import expect from "expect";
import { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter, submitQuery } from "../../src/actions/queries";
import sinon from "sinon";
import server from "../../src/actions/server";
import { parsers } from "../../src/parsers/gremlin";

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

describe("queries actions", () => { //eslint-disable-line no-undef

	const dispatch = (func, assert, getState = () => {}) => {
		const redispatch = (obj) => assert(obj);
		func(redispatch, getState);
	};

	it("should add a relation with addQueryFilter", (done) => { //eslint-disable-line no-undef
		const path = ["a", 1, "2"];
		const value = {type: "relation", targetType: "wwperson", name: "isRelatedTo"};
		dispatch(addQueryFilter(path, value), (obj) => {
			try {
				expect(obj).toEqual({
					type: "ADD_QUERY_FILTER",
					fieldPath: path,
					value: {
						type: "relation",
						name: "isRelatedTo",
						targetDomain: "wwperson",
						or: [{
							type: "entity",
							and: [],
							domain: "wwperson"
						}]
					}
				});
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it("should add a property with addQueryFilter", (done) => { //eslint-disable-line no-undef
		const path = ["a", 1, "2"];
		const value = {type: "property", name: "propName", or: [{type: "value", value: "val"}]};
		dispatch(addQueryFilter(path, value), (obj) => {
			try {
				expect(obj).toEqual({
					type: "ADD_QUERY_FILTER",
					fieldPath: path,
					value: value
				});
				done();
			} catch (e) {
				done(e);
			}
		});
	});


	it("should selectQuery", (done) => { //eslint-disable-line no-undef
		dispatch(selectQuery("dom", 1, {x: 1, y: 1}), (obj) => {
			try {
				expect(obj).toEqual({type: "SELECT_QUERY", domain: "dom", queryIndex: 1, position: {x: 1, y: 1}});
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it("should changeQuery", (done) => { //eslint-disable-line no-undef
		dispatch(changeQuery(["and", 0, "value"], "alteredPropVal"), (obj) => {
			try {
				expect(obj).toEqual({
					type: "SET_QUERY_FIELD_VALUE",
					fieldPath: ["and", 0, "value"],
					value: "alteredPropVal"
				});
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it("should deleteQueryFilter", (done) => {  //eslint-disable-line no-undef
		dispatch(deleteQueryFilter(1), (obj) => {
			try {
				expect(obj).toEqual({
					type: "DELETE_QUERY_FILTER",
					queryIndex: 1
				});
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it("should deleteQuery", (done) => { //eslint-disable-line no-undef
		dispatch(deleteQuery(1), (obj) => {
			try {
				expect(obj).toEqual({
					type: "DELETE_QUERY",
					queryIndex: 1
				});
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it("should setQueryPath", (done) => { //eslint-disable-line no-undef
		const path = ["a", 1, "2"];
		dispatch(setQueryPath(path), (obj) => {
			try {
				expect(obj).toEqual({
					type: "SET_QUERY_PATH",
					path: path
				});
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it("should submitQuery",/* (done) => { //eslint-disable-line no-undef
		const responseBody = "response";
		const state = {
			queries: {
				currentQuery: 0,
				queries: [sampleQuery]
			}
		};

		const finalize = (e) => {
			server.fastXhr.restore();
			done(e);
		};

		sinon.stub(server, "fastXhr", (opts, cb) => {
			expect(opts.method).toEqual("POST");
			expect(opts.url).toEqual("/api/v2.1/gremlin");
			expect(typeof opts.body).toEqual("string");
			cb(null, {body: responseBody});
		});

		let counts = 0;
		dispatch(submitQuery(), (obj) => {
			try {
				counts++;
				if(counts === 1) {
					expect(obj).toEqual({
						type: "SET_QUERY_RESULTS_PENDING"
					});
				} else if(counts === 2) {
					expect(obj).toEqual({
						type: "SET_QUERY_RESULTS",
						results: responseBody
					});
				} else if(counts === 3) {
					expect(obj).toEqual({
						type: "SET_QUERY_RESULT_COUNT",
						count: responseBody
					});
					done();
				}
			} catch (e) {
				finalize(e);
			}
		}, () => state);
	}*/);
});