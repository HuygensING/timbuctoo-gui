import sinon from "sinon";
import expect from "expect";
import server from "../../src/actions/server";
import store from "../../src/store";
import config from "../../src/config";
import {saveEntity, selectEntity, makeNewEntity, deleteEntity} from "../../src/actions/entity";
import relationSavers from "../../src/actions/relation-savers";
import {crud} from "../../src/actions/crud";

describe("entity", () => { //eslint-disable-line no-undef
	const VRE = "WomenWriters";
	let unsubscribe;

	function runWithInitialData(domain, data, fieldDefinitions, run, runAfter) {
		const onSetInitialEntity = () => {
			unsubscribe();
			unsubscribe = store.subscribe(runAfter);

			store.dispatch(run());
		};
		unsubscribe = store.subscribe(onSetInitialEntity);
		store.dispatch({type: "RECEIVE_ENTITY", data: data, domain: domain, fieldDefinitions: fieldDefinitions});
	}

	before((done) => { //eslint-disable-line no-undef

		const onVre = () => {
			unsubscribe();
			done();
		};

		const onUser = () => {
			unsubscribe();
			unsubscribe = store.subscribe(onVre);
			store.dispatch({type: "SET_VRE", vreId: VRE});
		};

		unsubscribe = store.subscribe(onUser);
		store.dispatch({type: "SET_USER", user: {token: "TOKEN"}});
	});

	it("should make a new entity with makeNewEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const responseFieldDefs = [
			{name: "testField1", type: "text"},
			{name: "testField2", type: "multiselect", options: ["foo", "bar"]},
			{name: "testField3", type: "relation"}
		];

		const finalize = (e) => {
			unsubscribe();
			crud.fetchFieldDescription.restore();
			done(e);
		};

		sinon.stub(crud, "fetchFieldDescription", (dom, next) => {
			try {
				expect(dom).toEqual(domain);
				next(responseFieldDefs);
			} catch(e) {
				finalize(e);
			}
		});

		unsubscribe = store.subscribe(() => {
			try {
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
				finalize();
			} catch (e) {
				finalize(e);
			}
		});

		store.dispatch(makeNewEntity(domain));
	});

	it("should fetch an entity with selectEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "ID";
		const responseData = {"@type": domain};
		const responseFieldDefs = [{"name": "test"}];
		let orderOfOperations = [];

		const finalize = (e) => {
			unsubscribe();
			crud.fetchEntity.restore();
			crud.fetchFieldDescription.restore();
			done(e);
		};

		sinon.stub(crud, "fetchEntity", (location, next) => {
			try {
				orderOfOperations.push("fetchEntity");
				expect(location).toEqual(`${config.apiUrl[config.apiVersion]}/domain/${domain}s/${entityId}`);
				next(responseData);
			} catch (e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "fetchFieldDescription", (dom, next) => {
			try {
				expect(dom).toEqual(domain);
				orderOfOperations.push("fetchFieldDescription");
				next(responseFieldDefs);
			} catch(e) {
				finalize(e);
			}
		});

		unsubscribe = store.subscribe(() => {
			try {
				expect(store.getState().entity).toEqual({
					data: responseData,
					domain: domain,
					fieldDefinitions: responseFieldDefs,
					errorMessage: null
				});
				expect(orderOfOperations).toEqual(["fetchEntity", "fetchFieldDescription"]);
				finalize();
			} catch (e) {
				finalize(e);
			}
		});


		store.dispatch(selectEntity(domain, entityId));
	});

	it("should save a new entity with saveEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "entId";
		const data = {"title": "a title", "@type": "dom", "@relations": {"x": "y"}};
		const fieldDefinitions = [{name: "title", type: "string"}];
		const expectedUrl = `${config.apiUrl[config.apiVersion]}/domain/${domain}s/${entityId}`;

		let orderOfOperations = [];

		const finalize = (e) => {
			unsubscribe();
			crud.fetchEntity.restore();
			crud.saveNewEntity.restore();
			crud.fetchFieldDescription.restore();
			relationSavers["v2.1"].restore();
			relationSavers.v4.restore();
			done(e);
		};

		const saveRelationsStub = (d, relationData, f, t, v, next) => {
			try {
				expect(relationData).toEqual(data["@relations"]);
				expect(d).toEqual({...data, _id: entityId});
				expect(f).toEqual(fieldDefinitions);
				expect(t).toEqual(store.getState().user.token);
				expect(v).toEqual(store.getState().vre.vreId);
				orderOfOperations.push("saveRelations");
				next();
			} catch (e) {
				finalize(e);
			}
		};

		sinon.stub(relationSavers, "v2.1", saveRelationsStub);
		sinon.stub(relationSavers, "v4", saveRelationsStub);

		sinon.stub(crud, "fetchFieldDescription", (dom, next) => {
			try {
				expect(dom).toEqual(domain);
				orderOfOperations.push("fetchFieldDescription");
				next(fieldDefinitions);
			} catch(e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "saveNewEntity", (dom, saveData, token, vreId, next) => {
			try {
				orderOfOperations.push("saveNewEntity");
				expect(saveData).toEqual({"title": data.title, "@type": domain});
				expect(token).toEqual(store.getState().user.token);
				expect(vreId).toEqual(store.getState().vre.vreId);
				next(null, {headers: {location: expectedUrl}});
			} catch (e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "fetchEntity", (location, next) => {
			try {
				orderOfOperations.push("fetchEntity");
				expect(location).toEqual(expectedUrl);
				next({...data, _id: entityId});
			} catch (e) {
				finalize(e);
			}
		});

		const assertSaveComplete = () => {
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
				expect(orderOfOperations).toEqual(["saveNewEntity", "fetchEntity", "saveRelations", "fetchEntity", "fetchFieldDescription"]);
				finalize();
			} catch (e) {
				finalize(e);
			}
		};

		runWithInitialData(domain, data, fieldDefinitions, saveEntity, assertSaveComplete);
	});


	it("should update an entity with saveEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "entId";
		const data = {"_id": entityId, "title": "a title", "@type": "dom", "@relations": {"foo": "bar"}};
		const fieldDefinitions = [{name: "title", type: "string"}];
		const expectedUrl = `${config.apiUrl[config.apiVersion]}/domain/${domain}s/${entityId}`;

		let orderOfOperations = [];


		const finalize = (e) => {
			unsubscribe();
			crud.fetchEntity.restore();
			crud.updateEntity.restore();
			crud.fetchFieldDescription.restore();
			relationSavers["v2.1"].restore();
			relationSavers.v4.restore();
			done(e);
		};

		const saveRelationsStub = (d, relationData, f, t, v, next) => {
			expect(relationData).toEqual(data["@relations"]);
			expect(d).toEqual(data);
			expect(f).toEqual(fieldDefinitions);
			expect(t).toEqual(store.getState().user.token);
			expect(v).toEqual(store.getState().vre.vreId);
			orderOfOperations.push("saveRelations");
			next();
		};

		sinon.stub(relationSavers, "v2.1", saveRelationsStub);
		sinon.stub(relationSavers, "v4", saveRelationsStub);

		sinon.stub(crud, "fetchEntity", (location, next) => {
			try {
				orderOfOperations.push("fetchEntity");
				expect(location).toEqual(expectedUrl);
				next(data);
			} catch (e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "fetchFieldDescription", (dom, next) => {
			try {
				expect(dom).toEqual(domain);
				orderOfOperations.push("fetchFieldDescription");
				next(fieldDefinitions);
			} catch(e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "updateEntity", (dom, saveData, token, vreId, next) => {
			try {
				expect(dom).toEqual("dom");
				expect(saveData).toEqual({"_id": entityId, "title": "a title", "@type": "dom"});
				expect(token).toEqual(store.getState().user.token);
				expect(vreId).toEqual(store.getState().vre.vreId);
				orderOfOperations.push("updateEntity");
				next(null, {body: JSON.stringify(data)});
			} catch(e) {
				finalize(e);
			}
		});

		const assertSaveComplete = () => {
			try {
				expect(store.getState().entity).toEqual({
					data: data,
					domain: domain,
					fieldDefinitions: fieldDefinitions,
					errorMessage: null
				});
				expect(orderOfOperations).toEqual(["updateEntity", "saveRelations", "fetchEntity", "fetchFieldDescription"]);

				finalize();
			} catch (e) {
				finalize(e);
			}
		};

		runWithInitialData(domain, data, fieldDefinitions, saveEntity, assertSaveComplete);
	});

	it("should delete an entity with deleteEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const data = {_id: "entId"};
		let orderOfOperations = [];

		const finalize = (e) => {
			unsubscribe();
			crud.deleteEntity.restore();
			crud.fetchFieldDescription.restore();
			done(e);
		};

		sinon.stub(crud, "fetchFieldDescription", (dom, next) => {
			try {
				expect(dom).toEqual(domain);
				orderOfOperations.push("fetchFieldDescription");
				next([]);
			} catch(e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "deleteEntity", (dom, entId, token, vreId, next) => {
			try {
				expect(dom).toEqual("dom");
				expect(entId).toEqual(data._id);
				expect(token).toEqual(store.getState().user.token);
				expect(vreId).toEqual(store.getState().vre.vreId);
				orderOfOperations.push("deleteEntity");
				next();
			} catch(e) {
				finalize(e);
			}
		});

		const assertDeleteComplete = () => {
			try {
				expect(orderOfOperations).toEqual(["deleteEntity", "fetchFieldDescription"]);
				expect(store.getState().entity.data).toEqual({"@type": domain});
				expect(store.getState().entity.domain).toEqual(domain);
				finalize();
			} catch(e) {
				finalize(e);
			}
		};

		runWithInitialData(domain, data, {}, deleteEntity, assertDeleteComplete);

	});

	it("should handle a delete exception with selectEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const data = {_id: "entId", "@type": domain};
		const expectedUrl = `${config.apiUrl[config.apiVersion]}/domain/${domain}s/${data._id}`;
		let orderOfOperations = [];

		const finalize = (e) => {
			unsubscribe();
			crud.deleteEntity.restore();
			crud.fetchEntity.restore();
			crud.fetchFieldDescription.restore();
			done(e);
		};

		sinon.stub(crud, "fetchEntity", (location, next) => {
			try {
				orderOfOperations.push("fetchEntity");
				expect(location).toEqual(expectedUrl);
				next(data);
			} catch (e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "fetchFieldDescription", (dom, next) => {
			try {
				expect(dom).toEqual(domain);
				orderOfOperations.push("fetchFieldDescription");
				next([]);
			} catch(e) {
				finalize(e);
			}
		});

		sinon.stub(crud, "deleteEntity", (dom, entId, token, vreId, next, fail) => {
			try {
				orderOfOperations.push("deleteEntity");
				fail();
			} catch(e) {
				finalize(e);
			}
		});

		const assertDeleteComplete = () => {
			try {
				expect(orderOfOperations).toEqual(["deleteEntity", "fetchEntity", "fetchFieldDescription"]);
				expect(store.getState().entity.data).toEqual(data);
				expect(store.getState().entity.domain).toEqual(domain);
				finalize();
			} catch(e) {
				finalize(e);
			}
		};

		runWithInitialData(domain, data, {}, deleteEntity, assertDeleteComplete);

	});

	it("should handle a fetch exception with makeNewEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		sinon.stub(server, "performXhr", (options, accept, reject) => {
			reject("reason", {
				body: "not found",
				statusCode: 404
			});
		});

		unsubscribe = store.subscribe(() => {
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

	it("should handle a fetch exception with selectEntity", (done) => { //eslint-disable-line no-undef
		const domain = "dom";
		const entityId = "ID";
		sinon.stub(server, "performXhr", (options, accept, reject) => {
			reject("reason", {
				body: "not found",
				statusCode: 404
			});
		});

		unsubscribe = store.subscribe(() => {
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



	it("should handle PUT server errors with saveEntity", (done) => {  //eslint-disable-line no-undef
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

		let count = 0;
		sinon.stub(server, "performXhr", (options, accept, reject) => {
			count++;
			if(count === 1) {
				reject("reason", {
					body: "not found",
					statusCode: 404
				});
			} else if(count === 2) {
				accept(null, {body: JSON.stringify(data)});
			} else if(count === 3) {
				accept(null, {body: JSON.stringify(fieldDefinitions)});
			}
		});

		const onSaveRejected = () => {
			unsubscribe();
			server.performXhr.restore();
			try {
				expect(store.getState().entity).toEqual({
					data: data,
					domain: domain,
					fieldDefinitions: fieldDefinitions,
					errorMessage: `Failed to save ${domain} with ID ${entityId}`
				});
				done();
			} catch (e) {
				done(e);
			}
		};

		runWithInitialData(domain, data, fieldDefinitions, saveEntity, onSaveRejected);
	});


	it("should handle POST server errors with saveEntity", (done) => {  //eslint-disable-line no-undef
		const domain = "dom";
		const data = {
			"title": "a title",
			"@type": "dom",
			"@relations": {}
		};
		const fieldDefinitions = [
			{name: "title", type: "string"}
		];

		let count = 0;
		sinon.stub(server, "performXhr", (options, accept, reject) => {
			count++;
			if(count === 1) {
				reject("reason", {
					body: "not found",
					statusCode: 404
				});
			} else if(count === 2) {
				accept(null, {body: JSON.stringify(fieldDefinitions)});
			}
		});

		const onSaveRejected = () => {
			unsubscribe();
			server.performXhr.restore();
			try {
				expect(store.getState().entity).toEqual({
					data: {"title": "", "@type": domain},
					domain: domain,
					fieldDefinitions: fieldDefinitions,
					errorMessage: `Failed to save new ${domain}`
				});
				done();
			} catch (e) {
				done(e);
			}
		};

		runWithInitialData(domain, data, fieldDefinitions, saveEntity, onSaveRejected);
	});

});
