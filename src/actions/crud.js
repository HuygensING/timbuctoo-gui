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

// 1) Fetch the fieldDefinitions for the given domain (TODO: should become server request in stead of static source file)
// 2) Dispatch the requested actionType (RECEIVE_ENTITY or NEW_ENTITY)
const fetchFieldDescription = (domain, actionType, data = null) => (dispatch) =>
	server.performXhr({
		headers: {"Accept": "application/json"},
		url: `/api/v4/fielddefinitions/${domain}`
	}, (err, resp) => {
		const fieldDefinitions = JSON.parse(resp.body);
		dispatch({
			type: actionType,
			domain: domain,
			fieldDefinitions: fieldDefinitions,
			data: data
		});
	});


export {saveNewEntity, updateEntity, deleteEntity, fetchEntity, fetchFieldDescription};