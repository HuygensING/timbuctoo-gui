import expect from "expect";
import { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter } from "../../src/actions/queries";

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
						entity: {
							type: "entity",
							and: [],
							domain: "wwperson"
						}
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
		dispatch(selectQuery("dom", 1), (obj) => {
			try {
				expect(obj).toEqual({type: "SELECT_QUERY", domain: "dom", queryIndex: 1});
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
});