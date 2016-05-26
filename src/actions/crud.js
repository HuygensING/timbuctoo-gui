import server from "./server";
import config from "../config";

const saveNewEntity = (domain, saveData, token, vreId, next, fail) =>
	server.performXhr({
		method: "POST",
		headers: server.makeHeaders(token, vreId),
		body: JSON.stringify(saveData),
		url: `${config.apiUrl[config.apiVersion]}/domain/${domain}`
	}, next, fail, `Create new ${domain}`);

const updateEntity = (domain, saveData, token, vreId, next, fail) =>
	server.performXhr({
		method: "PUT",
		headers: server.makeHeaders(token, vreId),
		body: JSON.stringify(saveData),
		url: `${config.apiUrl[config.apiVersion]}/domain/${domain}/${saveData._id}`
	}, next, fail, `Update ${domain}`);

const deleteEntity = (domain, entityId, token, vreId, next, fail) =>
	server.performXhr({
		method: "DELETE",
		headers: server.makeHeaders(token, vreId),
		url: `${config.apiUrl[config.apiVersion]}/domain/${domain}/${entityId}`
	}, next, fail, `Delete ${domain}`);

const fetchEntity = (location, next, fail) =>
	server.performXhr({
		method: "GET",
		headers: {"Accept": "application/json"},
		url: location
	}, (err, resp) => {
		const data = JSON.parse(resp.body);
		next(data);
	}, fail, "Fetch entity");

const fetchEntityList = (domain, start, rows, next) =>
	server.performXhr({
		method: "GET",
		headers: {"Accept": "application/json"},
		url: `${config.apiUrl[config.apiVersion]}/domain/${domain}?rows=${rows}&start=${start}`
	}, (err, resp) => {
		const data = JSON.parse(resp.body);
		next(data);
	});

const crud = {
	saveNewEntity: saveNewEntity,
	updateEntity: updateEntity,
	deleteEntity: deleteEntity,
	fetchEntity: fetchEntity,
	fetchEntityList: fetchEntityList
};

export {saveNewEntity, updateEntity, deleteEntity, fetchEntity, fetchEntityList, crud};