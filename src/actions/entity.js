import clone from "clone-deep";

import server from "./server";
import { saveNewEntity, updateEntity, fetchEntity } from "./crud";
import saveRelations from "./save-relations";


// Use XHR to fetch the keyword options defined in the fieldDefinition
// using path property.
//  --> FIXME: we should not use async for all this stuff,
//      the server could give these values via the fieldDefinitions directly
//   ---> TODO: move to mock server
const fetchKeywordOptions = (fieldDefinition, done) =>
		server.performXhr({
			url: `/api/v2.1/${fieldDefinition.path}`,
			headers: {
				"Accept": "application/json",
				"VRE_ID": "WomenWriters"
			}
		}, (err, resp, body) => resp.statusCode !== 200 ?
			done({key: fieldDefinition.name, options: []}) :
			done({key: fieldDefinition.name, options: JSON.parse(body).map((opt) => {return {key: opt.key.replace(/^.*\//, ""), value: opt.value}; }) }));


// 1) Fetch the fieldDefinitions for the given domain (TODO: should become server request in stead of static source file)
// 2) Fetch all the options for the fields which are of type "keyword"/relation (FIXME: this should come directly from the fieldDefinition)
// 3) Add the options as a property to the fieldDefinition
// 4) Dispatch the requested actionType (RECEIVE_ENTITY or NEW_ENTITY)
//  ---> TODO: move to mock server
const getFieldDescription = (domain, actionType, data = null) => (dispatch) =>

	server.performXhr({
		headers: {"Accept": "application/json"},
		url: `/api/v4/fieldDefinitions/${domain}`
	}, (err, resp) => {
		const fieldDefinitions = JSON.parse(resp.body);
		const promises = fieldDefinitions
			.filter((fieldDef) => fieldDef.type === "keyword")
			.map((fieldDef) => new Promise((resolve) => fetchKeywordOptions(fieldDef, resolve)));

		Promise.all(promises).then((responses) => {
			dispatch({
				type: actionType,
				domain: domain,
				fieldDefinitions: fieldDefinitions.map((fieldDef) => {
					return {
						...fieldDef,
						options: fieldDef.options || (responses.find((r) => r.key === fieldDef.name) || {}).options || null
					};
				}),
				data: data
			});
	});
});


// 1) Fetch entity
// 2) Fetch field description of this entity's domain
// 3) Dispatch RECEIVE_ENTITY for render
const selectEntity = (domain, entityId) =>
	(dispatch) =>
		fetchEntity(`/api/v4/domain/${domain}s/${entityId}`, (data) =>
			dispatch(getFieldDescription(data["@type"], "RECEIVE_ENTITY", data)));


// 1) Save an entity
// 2) Save the relations for this entity
// 3) Refetch entity for render
const saveEntity = () => (dispatch, getState) => {
	// Make a deep copy of the data to be saved in order to leave application state unaltered
	let saveData = clone(getState().entity.data);
	// Make a deep copy of the relation data in order to leave application state unaltered
	let relationData = clone(saveData["@relations"]) || {};
	// Delete the relation data from the saveData as it is not expected by the server
	delete saveData["@relations"];

	if(getState().entity.data._id) {
		// 1) Update the entity with saveData
		updateEntity(getState().entity.domain, saveData, getState().user.token, getState().vre, (err, resp) =>
			// 2) Save relations using server response for current relations to diff against relationData
			dispatch((redispatch) => saveRelations(JSON.parse(resp.body), relationData, getState().entity.fieldDefinitions, getState().user.token, getState().vre, () =>
				// 3) Refetch entity for render
				redispatch(selectEntity(getState().entity.domain, getState().entity.data._id)))));

	} else {
		// 1) Create new entity with saveData
		saveNewEntity(getState().entity.domain, saveData, getState().user.token, getState().vre, (err, resp) =>
			// 2) Fetch entity via location header
			dispatch((redispatch) => fetchEntity(resp.headers.location, (data) =>
				// 3) Save relations using server response for current relations to diff against relationData
				saveRelations(data, relationData, getState().entity.fieldDefinitions, getState().user.token, getState().vre, () =>
					// 4) Refetch entity for render
					redispatch(selectEntity(getState().entity.domain, data._id))))));
	}
};

// 1) Fetch field description for the given domain
// 2) Dispatch NEW_ENTITY with field description for render
const makeNewEntity = (domain) =>
	(dispatch) => dispatch(getFieldDescription(domain, "NEW_ENTITY"));

export {saveEntity, selectEntity, makeNewEntity};