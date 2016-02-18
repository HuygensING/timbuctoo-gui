import server from "./server";
import config from "../config";

const saveNewEntity = (domain, saveData, token, vreId, next, fail) =>
	server.performXhr({
		method: "POST",
		headers: server.makeHeaders(token, vreId),
		body: JSON.stringify(saveData),
		url: `/api/${config.apiVersion}/domain/${domain}s`
	}, next, fail, `Create new ${domain}`);

const updateEntity = (domain, saveData, token, vreId, next, fail) =>
	server.performXhr({
		method: "PUT",
		headers: server.makeHeaders(token, vreId),
		body: JSON.stringify(saveData),
		url: `/api/${config.apiVersion}/domain/${domain}s/${saveData._id}`
	}, next, fail, `Update ${domain}`);

const deleteEntity = (domain, entityId, token, vreId, next, fail) =>
	server.performXhr({
		method: "DELETE",
		headers: server.makeHeaders(token, vreId),
		url: `/api/${config.apiVersion}/domain/${domain}s/${entityId}`
	}, next, fail, `Delete ${domain}`);

const fetchEntity = (location, next, fail) =>
	server.performXhr({
		method: "GET",
		headers: {"Accept": "application/json"},
		url: location.replace("//", "")
	}, (err, resp) => {
		const data = JSON.parse(resp.body);
		next(data);
	}, fail, "Fetch entity");

const fetchFieldDescription = (domain, next, fail) =>
	server.performXhr({
		headers: {"Accept": "application/json"},
		url: `/api/v4/fielddefinitions/${domain}`
	}, (err, resp) => {
		const fieldDefinitions = JSON.parse(resp.body);
		next(fieldDefinitions);
	}, fail);



const crud = {
	saveNewEntity: saveNewEntity,
	updateEntity: updateEntity,
	deleteEntity: deleteEntity,
	fetchEntity: fetchEntity,
	fetchFieldDescription: fetchFieldDescription
};

export {saveNewEntity, updateEntity, deleteEntity, fetchEntity, crud};