import sinon from "sinon";
import expect from "expect";
import server from "../../src/actions/server";
import store from "../../src/store";
import config from "../../src/config";
import {saveEntity, selectEntity, makeNewEntity, setSaveRelationsFunc} from "../../src/actions/entity";


describe("entity", () => { //eslint-disable-line no-undef

	beforeEach((done) => { //eslint-disable-line no-undef
		let unsubscribe;

		const onUser = () => {
			unsubscribe();
			done();
		};

		unsubscribe = store.subscribe(onUser);
		store.dispatch({type: "SET_USER", user: {token: "TOKEN"}});

	});

	it("should save a new entity with saveEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "entId";
		const data = {
			"title": "a title",
			"@type": "dom",
			"@relations": {"x": "y"}
		};
		const fieldDefinitions = [
			{name: "title", type: "string"}
		];
		const expectedUrl = `/api/${config.apiVersion}/domain/${domain}s/${entityId}`;
		let unsubscribe;

		let saveRelationsCalled = false;

		setSaveRelationsFunc((d, relationData, f, t, v, next) => {
			expect(relationData).toEqual(data["@relations"]);
			expect(d).toEqual({...data, _id: entityId});
			expect(f).toEqual(fieldDefinitions);
			expect(t).toEqual(store.getState().user.token);
			expect(v).toEqual(store.getState().vre);
			saveRelationsCalled = true;
			next();
		});

		const onSave = () => {
			unsubscribe();
			server.performXhr.restore();
			try {
				expect(store.getState().entity).toEqual({
					data: {
						...data,
						_id: entityId
					},
					domain: domain,
					fieldDefinitions: fieldDefinitions,
					errorMessage: null
				});
				expect(saveRelationsCalled).toEqual(true);
				done();
			} catch (e) {
				done(e);
			}
		};

		let count = 0;
		const xhrStub = (options, accept) => {
			try {
				count++;
				if(count === 1) {
					expect(options.method).toEqual("POST");
					accept(null, {headers: {location: expectedUrl}});
				} else if(count === 2) {
					expect(options.url).toEqual(expectedUrl);
					expect(options.method).toEqual("GET");
					accept(null, {body: JSON.stringify({...data, _id: entityId})});
				} else if(count === 3) {
					expect(options.url).toEqual(expectedUrl);
					accept(null, {body: JSON.stringify({...data, _id: entityId})});
				} else if(count === 4) {
					expect(options.url).toEqual(`/api/v4/fielddefinitions/${domain}`);
					accept(null, {body: JSON.stringify(fieldDefinitions)});
				}
			} catch (e) {
				unsubscribe();
				server.performXhr.restore();
				done(e);
			}
		};


		const onSetInitialEntity = () => {
			unsubscribe();
			unsubscribe = store.subscribe(onSave);

			sinon.stub(server, "performXhr", xhrStub);
			store.dispatch(saveEntity());
		};

		unsubscribe = store.subscribe(onSetInitialEntity);

		store.dispatch({type: "RECEIVE_ENTITY", data: data, domain: domain, fieldDefinitions: fieldDefinitions});
	});


	it("should update an entity with saveEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "entId";
		const data = {
			"_id": entityId,
			"title": "a title",
			"@type": "dom",
			"@relations": {}
		};
		const fieldDefinitions = [
			{name: "title", type: "string"}
		];
		const expectedUrl = `/api/${config.apiVersion}/domain/${domain}s/${entityId}`;
		let unsubscribe;

		let saveRelationsCalled = false;

		setSaveRelationsFunc((d, relationData, f, t, v, next) => {
			expect(relationData).toEqual(data["@relations"]);
			expect(d).toEqual({...data, _id: entityId});
			expect(f).toEqual(fieldDefinitions);
			expect(t).toEqual(store.getState().user.token);
			expect(v).toEqual(store.getState().vre);
			saveRelationsCalled = true;
			next();
		});

		const onSave = () => {
			unsubscribe();
			server.performXhr.restore();
			try {
				expect(store.getState().entity).toEqual({
					data: data,
					domain: domain,
					fieldDefinitions: fieldDefinitions,
					errorMessage: null
				});
				expect(saveRelationsCalled).toEqual(true);

				done();
			} catch (e) {
				done(e);
			}
		};

		let count = 0;
		const xhrStub = (options, accept) => {
			try {
				count++;
				if(count === 1) {
					expect(options.method).toEqual("PUT");
					accept(null, {body: JSON.stringify(data)});
				} else if(count === 2) {
					expect(options.url).toEqual(expectedUrl);
					accept(null, {body: JSON.stringify(data)});
				} else if(count === 3) {
					expect(options.url).toEqual(`/api/v4/fielddefinitions/${domain}`);
					accept(null, {body: JSON.stringify(fieldDefinitions)});
				}
			} catch (e) {
				unsubscribe();
				server.performXhr.restore();
				done(e);
			}
		};


		const onSetInitialEntity = () => {
			unsubscribe();
			unsubscribe = store.subscribe(onSave);

			sinon.stub(server, "performXhr", xhrStub);
			store.dispatch(saveEntity());
		};

		unsubscribe = store.subscribe(onSetInitialEntity);

		store.dispatch({type: "RECEIVE_ENTITY", data: data, domain: domain, fieldDefinitions: fieldDefinitions});
	});


	it("should handle PUT and POST server errors with saveEntity"); //eslint-disable-line no-undef


	it("should make a new entity with makeNewEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const responseFieldDefs = [
			{name: "testField1", type: "text"},
			{name: "testField2", type: "multiselect", options: ["foo", "bar"]},
			{name: "testField3", type: "relation"}
		];

		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				expect(options).toEqual({
					url: `/api/v4/fielddefinitions/${domain}`,
					headers: {
						"Accept": "application/json"
					}
				});
				accept(null, {body: JSON.stringify(responseFieldDefs)});
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		const unsubscribe = store.subscribe(() => {
			try {
				unsubscribe();
				expect(store.getState().entity).toEqual({
					data: {
						testField1: "",
						testField2: [],
						"@relations": {},
						"@type": "dom"
					},
					domain: domain,
					fieldDefinitions: responseFieldDefs,
					errorMessage: null
				});
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});

		store.dispatch(makeNewEntity(domain));
	});


	it("should handle a fetch exception with makeNewEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		sinon.stub(server, "performXhr", (options, accept, reject) => {
			reject("reason", {
				body: "not found",
				statusCode: 404
			});
		});

		const unsubscribe = store.subscribe(() => {
			try {
				unsubscribe();
				expect(store.getState().entity).toEqual({
					data: null,
					domain: domain,
					errorMessage: `Failed to fetch field definitions for ${domain}`,
					fieldDefinitions: null
				});
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});

		store.dispatch(makeNewEntity(domain));
	});

	it("should fetch an entity with selectEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "ID";
		const responseData = {"@type": domain};
		const responseFieldDefs = [{"name": "test"}];
		let count = 0;
		sinon.stub(server, "performXhr", (options, accept) => {
			try {
				count++;
				if(count === 1) {
					expect(options).toEqual({
						url: `/api/${config.apiVersion}/domain/${domain}s/${entityId}`,
						headers: {
							"Accept": "application/json"
						},
						method: "GET"
					});
					accept(null, {body: JSON.stringify(responseData)});

				} else if(count === 2) {
					expect(options).toEqual({
						url: `/api/v4/fielddefinitions/${domain}`,
						headers: {
							"Accept": "application/json"
						}
					});
					accept(null, {body: JSON.stringify(responseFieldDefs)});
				}
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		const unsubscribe = store.subscribe(() => {
			try {
				unsubscribe();
				expect(store.getState().entity).toEqual({
					data: responseData,
					domain: domain,
					fieldDefinitions: responseFieldDefs,
					errorMessage: null
				});
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});

		store.dispatch(selectEntity(domain, entityId));
	});

	it("should handle a fetch exception with selectEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "ID";
		sinon.stub(server, "performXhr", (options, accept, reject) => {
			reject("reason", {
				body: "not found",
				statusCode: 404
			});
		});

		const unsubscribe = store.subscribe(() => {
			try {
				unsubscribe();
				expect(store.getState().entity).toEqual({
					data: null,
					domain: domain,
					errorMessage: `Failed to fetch dom with ID ${entityId}`,
					fieldDefinitions: null
				});
				server.performXhr.restore();
				done();
			} catch (e) {
				server.performXhr.restore();
				done(e);
			}
		});

		store.dispatch(selectEntity(domain, entityId));
	});

});
