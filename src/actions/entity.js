import clone from "clone-deep";
import { saveNewEntity, updateEntity, fetchEntity } from "./crud";
import server from "./server";
import saveRelationsV4 from "./save-relations";
import saveRelationsV21 from "./v2.1/save-relations";
import config from "../config";

let saveRelations = config.apiVersion === "v2.1" ? saveRelationsV21 : saveRelationsV4;

const setSaveRelationsFunc = (func) => { saveRelations = func; };

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
	}, () => {
		dispatch({
			type: "RECEIVE_ENTITY_FAILURE",
			errorMessage: `Failed to fetch field definitions for ${domain}`
		});
	});

// 1) Fetch entity
// 2) Fetch field description of this entity's domain
// 3) Dispatch RECEIVE_ENTITY for render
const selectEntity = (domain, entityId) =>
	(dispatch) =>
		fetchEntity(`/api/${config.apiVersion}/domain/${domain}s/${entityId}`, (data) =>
			dispatch(fetchFieldDescription(data["@type"], "RECEIVE_ENTITY", data)), () =>
				dispatch({type: "RECEIVE_ENTITY_FAILURE", errorMessage: `Failed to fetch ${domain} with ID ${entityId}`}));


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
	(dispatch) => dispatch(fetchFieldDescription(domain, "NEW_ENTITY"));

export {saveEntity, selectEntity, makeNewEntity, setSaveRelationsFunc};