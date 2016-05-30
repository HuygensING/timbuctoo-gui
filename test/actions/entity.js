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
	const domain = "doms";

	let unsubscribe;

	function runWithInitialData(data, run, runAfter) {
		const onSetInitialEntity = () => {
			unsubscribe();
			unsubscribe = store.subscribe(runAfter);

			store.dispatch(run());
		};
		unsubscribe = store.subscribe(onSetInitialEntity);
		store.dispatch({type: "RECEIVE_ENTITY", data: data, domain: domain, fieldDefinitions: store.getState().vre.collections[domain]});
	}

	before((done) => { //eslint-disable-line no-undef

		const onVre = () => {
			unsubscribe();
			done();
		};

		const onUser = () => {
			unsubscribe();
			unsubscribe = store.subscribe(onVre);
			store.dispatch({type: "SET_VRE", vreId: VRE, collections: {
				doms: [
					{name: "testField1", type: "text"},
					{name: "testField2", type: "multiselect"},
					{name: "testRelationField", type: "relation"}
				]
			}});
		};

		unsubscribe = store.subscribe(onUser);
		store.dispatch({type: "SET_USER", user: {token: "TOKEN"}});
	});

	it("should make a new entity with makeNewEntity", (done) => { //eslint-disable-line no-undef

		const finalize = (e) => {
			unsubscribe();
			done(e);
		};

		unsubscribe = store.subscribe(() => {
			try {
				expect(store.getState().entity).toEqual({
					data: {
						testField1: "",
						testField2: [],
						"@relations": {},
						"@type": domain.replace(/s$/, "")
					},
					domain: domain,
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
		const entityId = "ID";
		const responseData = {"@type": domain};

		const finalize = (e) => {
			unsubscribe();
			crud.fetchEntity.restore();
			done(e);
		};

		sinon.stub(crud, "fetchEntity", (location, next) => {
			try {
				expect(location).toEqual(`${config.apiUrl[config.apiVersion]}/domain/${domain}/${entityId}`);
				next(responseData);
			} catch (e) {
				finalize(e);
			}
		});

		unsubscribe = store.subscribe(() => {
			try {
				expect(store.getState().entity).toEqual({
					data: responseData,
					domain: domain,
					errorMessage: null
				});
				finalize();
			} catch (e) {
				finalize(e);
			}
		});


		store.dispatch(selectEntity(domain, entityId));
	});



	it("should save a new entity with saveEntity", (done) => { //eslint-disable-line no-undef
		const entityId = "entId";
		const data = {"title": "a title", "@type": "dom", "@relations": {"x": "y"}};
		const expectedUrl = `${config.apiUrl[config.apiVersion]}/domain/${domain}/${entityId}`;

		let orderOfOperations = [], exception = null;

		const finalize = (e) => {
			unsubscribe();
			crud.fetchEntity.restore();
			crud.saveNewEntity.restore();
			crud.fetchEntityList.restore();
			relationSavers["v2.1"].restore();
			relationSavers.v4.restore();
			done(e);
		};

		const saveRelationsStub = (d, relationData, f, t, v, next) => {
			try {
				expect(relationData).toEqual(data["@relations"]);
				expect(d).toEqual({...data, _id: entityId});
				expect(f).toEqual(store.getState().vre.collections[domain]);
				expect(t).toEqual(store.getState().user.token);
				expect(v).toEqual(store.getState().vre.vreId);
				orderOfOperations.push("saveRelations");
				next();
			} catch (e) {
				exception = e;
			}
		};

		sinon.stub(relationSavers, "v2.1", saveRelationsStub);
		sinon.stub(relationSavers, "v4", saveRelationsStub);


		sinon.stub(crud, "saveNewEntity", (dom, saveData, token, vreId, next) => {
			try {
				orderOfOperations.push("saveNewEntity");
				expect(saveData).toEqual({"title": data.title, "@type": data["@type"]});
				expect(token).toEqual(store.getState().user.token);
				expect(vreId).toEqual(store.getState().vre.vreId);
				next(null, {headers: {location: expectedUrl}});
			} catch (e) {
				exception = e;
			}
		});

		sinon.stub(crud, "fetchEntity", (location, next) => {
			try {
				orderOfOperations.push("fetchEntity");
				expect(location).toEqual(expectedUrl);
				next({...data, _id: entityId});
			} catch (e) {
				exception = e;
			}
		});

		sinon.stub(crud, "fetchEntityList", () => {
			finalize(exception);
		});

		const assertSaveComplete = () => {
			try {
				expect(store.getState().entity).toEqual({
					data: {
						...data,
						_id: entityId
					},
					domain: domain,
					errorMessage: null
				});
				expect(orderOfOperations).toEqual(["saveNewEntity", "fetchEntity", "saveRelations", "fetchEntity"]);
			} catch (e) {
				exception = e;
			}
		};

		runWithInitialData(data, saveEntity, assertSaveComplete);
	});


	it("should update an entity with saveEntity", (done) => { //eslint-disable-line no-undef
		const entityId = "entId";
		const data = {"_id": entityId, "title": "a title", "@type": "dom", "@relations": {"foo": "bar"}};
		const expectedUrl = `${config.apiUrl[config.apiVersion]}/domain/${domain}/${entityId}`;

		let orderOfOperations = [], exception = null;


		const finalize = (e) => {
			unsubscribe();
			crud.fetchEntity.restore();
			crud.updateEntity.restore();
			crud.fetchEntityList.restore();
			relationSavers["v2.1"].restore();
			relationSavers.v4.restore();
			done(e);
		};

		const saveRelationsStub = (d, relationData, f, t, v, next) => {
			expect(relationData).toEqual(data["@relations"]);
			expect(d).toEqual(data);
			expect(f).toEqual(store.getState().vre.collections[domain]);
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
				exception = e;
			}
		});

		sinon.stub(crud, "updateEntity", (dom, saveData, token, vreId, next) => {
			try {
				expect(dom).toEqual(domain);
				expect(saveData).toEqual({"_id": entityId, "title": "a title", "@type": "dom"});
				expect(token).toEqual(store.getState().user.token);
				expect(vreId).toEqual(store.getState().vre.vreId);
				orderOfOperations.push("updateEntity");
				next(null, {body: JSON.stringify(data)});
			} catch(e) {
				exception = e;
			}
		});

		sinon.stub(crud, "fetchEntityList", () => {
			finalize(exception);
		});

		const assertSaveComplete = () => {
			try {
				expect(store.getState().entity).toEqual({
					data: data,
					domain: domain,
					errorMessage: null
				});
				expect(orderOfOperations).toEqual(["updateEntity", "saveRelations", "fetchEntity"]);

			} catch (e) {
				exception = e;
			}
		};

		runWithInitialData(data, saveEntity, assertSaveComplete);
	});


	it("should delete an entity with deleteEntity", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entId"};
		let orderOfOperations = [];
		let counts = 0, exception = null;

		const finalize = (e) => {
			unsubscribe();
			crud.deleteEntity.restore();
			crud.fetchEntityList.restore();
			done(e);
		};


		sinon.stub(crud, "fetchEntityList", () => { finalize(exception); });


		sinon.stub(crud, "deleteEntity", (dom, entId, token, vreId, next) => {
			try {
				expect(dom).toEqual(domain);
				expect(entId).toEqual(data._id);
				expect(token).toEqual(store.getState().user.token);
				expect(vreId).toEqual(store.getState().vre.vreId);
				orderOfOperations.push("deleteEntity");
				next();
			} catch(e) {
				exception = e;
			}
		});


		const assertDeleteComplete = () => {
			if (++counts === 1) { return; }
			else if (counts === 2) {
				try {
					expect(orderOfOperations).toEqual(["deleteEntity"]);
					expect(store.getState().entity.data).toEqual({
						"@type": domain.replace(/s$/, ""),
						"testField1": "",
						"testField2": [],
						"@relations": {}
					});
					expect(store.getState().entity.domain).toEqual(domain);
				} catch(e) {
					exception = e;
				}
			}
		};

		runWithInitialData(data, deleteEntity, assertDeleteComplete);

	});


	it("should handle a delete exception with selectEntity", (done) => { //eslint-disable-line no-undef
		const data = {_id: "entId", "@type": domain.replace(/s$/, "")};
		const expectedUrl = `${config.apiUrl[config.apiVersion]}/domain/${domain}/${data._id}`;
		let orderOfOperations = [];

		const finalize = (e) => {
			unsubscribe();
			crud.deleteEntity.restore();
			crud.fetchEntity.restore();
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
				expect(orderOfOperations).toEqual(["deleteEntity", "fetchEntity"]);
				expect(store.getState().entity.data).toEqual(data);
				expect(store.getState().entity.domain).toEqual(domain);
				finalize();
			} catch(e) {
				finalize(e);
			}
		};

		runWithInitialData(data, deleteEntity, assertDeleteComplete);

	});


	it("should handle a fetch exception with selectEntity", (done) => { //eslint-disable-line no-undef
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
					errorMessage: `Failed to fetch doms with ID ${entityId}`
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
		const entityId = "entId";
		const data = {
			"_id": entityId,
			"title": "a title",
			"@type": "dom",
			"@relations": {}
		};

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
			}
		});

		const onSaveRejected = () => {
			unsubscribe();
			server.performXhr.restore();
			try {
				expect(store.getState().entity).toEqual({
					data: data,
					domain: domain,
					errorMessage: `Failed to save ${domain} with ID ${entityId}`
				});
				done();
			} catch (e) {
				done(e);
			}
		};

		runWithInitialData(data, saveEntity, onSaveRejected);
	});


	it("should handle POST server errors with saveEntity", (done) => {  //eslint-disable-line no-undef
		const data = {
			"title": "a title",
			"@type": "dom",
			"@relations": {}
		};

		sinon.stub(server, "performXhr", (options, accept, reject) => {
			reject("reason", {
				body: "not found",
				statusCode: 404
			});
		});

		const onSaveRejected = () => {
			unsubscribe();
			server.performXhr.restore();
			try {
				expect(store.getState().entity).toEqual({
					data: {
						"testField1": "",
						"testField2": [],
						"@relations": {},
						"@type": domain.replace(/s$/, "")
					},
					domain: domain,
					errorMessage: `Failed to save new ${domain}`
				});
				done();
			} catch (e) {
				done(e);
			}
		};

		runWithInitialData(data, saveEntity, onSaveRejected);
	});

});
