import sinon from "sinon";
import expect from "expect";
import server from "../../src/actions/server";
import {saveNewEntity, updateEntity, deleteEntity, fetchEntity} from "../../src/actions/crud";
import config from "../../src/config";


describe("crud", () => { //eslint-disable-line no-undef

	it("should fetch an entity with GET invoke next with response data", (done) => { //eslint-disable-line no-undef
		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			try {
				expect(options).toEqual({
					url: "/loc",
					headers: {
						"Accept": "application/json"
					},
					method: "GET"
				});
				expect(operation).toEqual("Fetch entity");
				expect(reject()).toEqual("reject_GET");
				accept(null, {body: JSON.stringify({data: "data"})});
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		fetchEntity("/loc", (data) => {
			try {
				expect(data).toEqual({data: "data"});
				sinon.assert.calledOnce(server.performXhr);
				server.performXhr.restore();
				done();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		}, () => "reject_GET");

	});

	it("should update an entity with PUT", (done) => { //eslint-disable-line no-undef
		const vreId = "VRE";
		const saveData = {_id: "123"};
		const token = "token";
		const domain = "dom";

		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			try {
				expect(options).toEqual({
					url: `${config.apiUrl[config.apiVersion]}/domain/${domain}/${saveData._id}`,
					headers: {
						"Content-type": "application/json",
						"Accept": "application/json",
						"Authorization": token,
						"VRE_ID": vreId
					},
					method: "PUT",
					body: JSON.stringify(saveData)
				});
				expect(operation).toEqual(`Update ${domain}`);
				expect(accept()).toEqual("accept_PUT");
				expect(reject()).toEqual("reject_PUT");
				sinon.assert.calledOnce(server.performXhr);
				server.performXhr.restore();
				done();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		updateEntity(domain, saveData, token, vreId, () => "accept_PUT", () => "reject_PUT");

	});


	it("should delete an entity with DELETE", (done) => { //eslint-disable-line no-undef
		const vreId = "VRE";
		const entityId = "del_123";
		const token = "token";
		const domain = "dom";

		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			try {
				expect(options).toEqual({
					url: `${config.apiUrl[config.apiVersion]}/domain/${domain}/${entityId}`,
					headers: {
						"Content-type": "application/json",
						"Accept": "application/json",
						"Authorization": token,
						"VRE_ID": vreId
					},
					method: "DELETE"
				});
				expect(operation).toEqual(`Delete ${domain}`);
				expect(accept()).toEqual("accept_DELETE");
				expect(reject()).toEqual("reject_DELETE");
				sinon.assert.calledOnce(server.performXhr);
				server.performXhr.restore();
				done();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		deleteEntity(domain, entityId, token, vreId, () => "accept_DELETE", () => "reject_DELETE");


	});


	it("should create an entity with POST", (done) => { //eslint-disable-line no-undef
		const vreId = "VRE";
		const saveData = {data: "data"};
		const token = "token";
		const domain = "dom";

		sinon.stub(server, "performXhr", (options, accept, reject, operation) => {
			try {
				expect(options).toEqual({
					url: `${config.apiUrl[config.apiVersion]}/domain/${domain}`,
					headers: {
						"Content-type": "application/json",
						"Accept": "application/json",
						"Authorization": token,
						"VRE_ID": vreId
					},
					method: "POST",
					body: JSON.stringify(saveData)
				});
				expect(operation).toEqual(`Create new ${domain}`);
				expect(accept()).toEqual("accept_POST");
				expect(reject()).toEqual("reject_POST");
				sinon.assert.calledOnce(server.performXhr);
				server.performXhr.restore();
				done();
			} catch(e) {
				server.performXhr.restore();
				done(e);
			}
		});

		saveNewEntity(domain, saveData, token, vreId, () => "accept_POST", () => "reject_POST");


	});
});