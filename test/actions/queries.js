//const DOMAIN_MAP = {
//	WomenWriters: {
//		"document": "wwdocument",
//		"keyword": "wwkeyword",
//		"collective": "wwcollective",
//		"person": "wwperson"
//	}
//};
//
//const selectQuery = (domain, queryIndex) => (dispatch) =>
//	dispatch({type: "SELECT_QUERY", queryIndex: queryIndex, domain: domain});
//
//const setQueryPath = (path) => (dispatch) =>
//	dispatch({type: "SET_QUERY_PATH", path: path});
//
//const deleteQuery = (queryIndex) => (dispatch) =>
//	dispatch({type: "DELETE_QUERY", queryIndex: queryIndex});
//
//const changeQuery = (fieldPath, value) => (dispatch) =>
//	dispatch({type: "SET_QUERY_FIELD_VALUE", fieldPath: fieldPath, value: value});
//
//const addQueryFilter = (fieldPath, value) => (dispatch, getState) => {
//	if(value.type === "relation") {
//		const targetDomain = DOMAIN_MAP[getState().vre.vreId][value.targetType];
//		const newEntity = {domain: targetDomain, and: []};
//		value.entity = newEntity;
//		delete value.targetType;
//	}
//	dispatch({type: "ADD_QUERY_FILTER", fieldPath: fieldPath, value: value});
//};
//
//const deleteQueryFilter = (queryIndex) => (dispatch) =>
//	dispatch({type: "DELETE_QUERY_FILTER", queryIndex: queryIndex});
//
//
//export { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter };
import expect from "expect";
import sinon from "sinon";

import store from "../../src/store";
import server from "../../src/actions/server";
import { debouncers } from "../../src/reducers/queries";

import { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter } from "../../src/actions/queries";

describe("queries actions", () => { //eslint-disable-line no-undef

	beforeEach((done) => { //eslint-disable-line no-undef
		sinon.stub(server, "fastXhr");
		sinon.stub(debouncers, "sendDelayedQuery");
		let unsubscribe;

		unsubscribe = store.subscribe(() => {
			unsubscribe();
			unsubscribe = store.subscribe(() => {
				unsubscribe();
				done();
			});
			store.dispatch(changeQuery(["and", 0], {type: "property", name: "prop", value: "propVal"}));
		});
		store.dispatch(selectQuery("dom0", 0));
	});

	afterEach((done) => { //eslint-disable-line no-undef
		server.fastXhr.restore();
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			done();
		});
		store.dispatch(setQueryPath(["entity"]));
		debouncers.sendDelayedQuery.restore();
	});



	it("should changeQuery", (done) => {  //eslint-disable-line no-undef
		const currentQuery = store.getState().queries.currentQuery;
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().queries.queries[currentQuery].entity.and[0]).toEqual(
					{type: "property", name: "prop", value: "alteredPropVal"}
				);
				done();
			} catch (e) {
				done(e);
			}
		});

		store.dispatch(changeQuery(["and", 0, "value"], "alteredPropVal"));
	});


	it("should selectQuery", (done) => { //eslint-disable-line no-undef
		let unsubscribe;

		const finalize = (e) => {
			unsubscribe();
			done(e);
		};

		const onSelect = () => {
			try {
				expect(store.getState().queries.currentQuery).toEqual(0);
				finalize();
			} catch (e) {
				finalize(e);
			}
		};

		const onCreate = () => {
			unsubscribe();
			try {
				const query = store.getState().queries.queries[store.getState().queries.currentQuery];
				expect(store.getState().queries.currentQuery).toEqual(1);
				expect(query.domain).toEqual("dom1");
				expect(query.entity).toEqual({and: [], domain: "dom1"});

				unsubscribe = store.subscribe(onSelect);
				store.dispatch(selectQuery("dom0", 0));
			} catch (e) {
				finalize(e);
			}
		};
		unsubscribe = store.subscribe(onCreate);
		store.dispatch(selectQuery("dom1", 1));
	});


	it("should deleteQueryFilter", (done) => {  //eslint-disable-line no-undef
		const currentQuery = store.getState().queries.currentQuery;

		let unsubscribe;

		unsubscribe = store.subscribe(() => {
			unsubscribe();
			unsubscribe = store.subscribe(() => {
				unsubscribe();

				try {
					expect(store.getState().queries.queries[currentQuery]).toEqual({
						deleted: false,
						domain: "dom0",
						entity: {
							and: [],
							domain: "dom0"
						},
						pathToQuerySelection: ["entity"]
					});
					done();
				} catch (e) {
					done(e);
				}
			});
			store.dispatch(deleteQueryFilter(currentQuery));
		});
		store.dispatch(setQueryPath(["entity", "and", 0]));
	});

	it("should setQueryPath", (done) => { //eslint-disable-line no-undef
		const path = ["a", 1, "2"];
		const currentQuery = store.getState().queries.currentQuery;
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().queries.queries[currentQuery].pathToQuerySelection).toEqual(path);
				done();
			} catch (e) {
				done(e);
			}
		});
		store.dispatch(setQueryPath(path));
	});

	it("should addQueryFilter", (done) => { //eslint-disable-line no-undef
		const path = ["and"];
		const currentQuery = store.getState().queries.currentQuery;
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().queries.queries[currentQuery]).toEqual({
					deleted: false,
					domain: "dom0",
					entity: {
						domain: "dom0",
						"and": [
							{type: "property", name: "prop", value: "propVal"},
							{
								type: "relation",
								name: "isRelatedTo",
								entity: {
									and: [],
									"domain": "wwperson"
								}
							}
						]
					},
					pathToQuerySelection: ["entity"]
				});
				done();
			} catch (e) {
				done(e);
			}
		});
		store.dispatch(addQueryFilter(path, {type: "relation", targetType: "wwperson", name: "isRelatedTo"}));
	});


	it("should deleteQuery", (done) => { //eslint-disable-line no-undef
		const unsubscribe = store.subscribe(() => {
			unsubscribe();
			try {
				expect(store.getState().queries.queries[0].deleted).toEqual(true);
				expect(store.getState().queries.currentQuery).toEqual(-1);
				done();
			} catch (e) {
				done(e);
			}
		});
		store.dispatch(deleteQuery(0));
	});

});