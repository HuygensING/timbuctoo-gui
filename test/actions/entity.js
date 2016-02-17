import sinon from "sinon";
import expect from "expect";
import server from "../../src/actions/server";
import store from "../../src/store";
import config from "../../src/config";
import {saveEntity, selectEntity, makeNewEntity} from "../../src/actions/entity";


describe("entity", () => { //eslint-disable-line no-undef

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
					errorMessage: "not found",
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
