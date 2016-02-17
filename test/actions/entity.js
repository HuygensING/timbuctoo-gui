import sinon from "sinon";
import expect from "expect";
import server from "../../src/actions/server";
import store from "../../src/store";
import config from "../../src/config";
import {saveEntity, selectEntity, makeNewEntity} from "../../src/actions/entity";


describe("entity", () => { //eslint-disable-line no-undef

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
