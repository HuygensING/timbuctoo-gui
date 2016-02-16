import server from "./server";

const saveNewEntity = (domain, saveData, token, vreId, next, fail) =>
	server.performXhr({
		method: "POST",
		headers: server.makeHeaders(token, vreId),
		body: JSON.stringify(saveData),
		url: `/api/v4/domain/${domain}s`
	}, next, fail, `Create new ${domain}`);

const updateEntity = (domain, saveData, token, vreId, next, fail) =>
	server.performXhr({
		method: "PUT",
		headers: server.makeHeaders(token, vreId),
		body: JSON.stringify(saveData),
		url: `/api/v4/domain/${domain}s/${saveData._id}`
	}, next, fail, `Update ${domain}`);

const deleteEntity = (domain, entityId, token, vreId, next, fail) =>
	server.performXhr({
		method: "DELETE",
		headers: server.makeHeaders(token, vreId),
		url: `/api/v4/domain/${domain}s/${entityId}`
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

export {saveNewEntity, updateEntity, deleteEntity, fetchEntity};