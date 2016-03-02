import clone from "clone-deep";
import { crud } from "./crud";
import saveRelations from "./relation-savers";
import config from "../config";

// 1) Fetch entity
// 2) Fetch field description of this entity's domain
// 3) Dispatch RECEIVE_ENTITY for render
const selectEntity = (domain, entityId, errorMessage = null) =>
	(dispatch, getState) =>
		crud.fetchEntity(`${config.apiUrl[config.apiVersion]}/domain/${domain}/${entityId}`, (data) =>
			dispatch({type: "RECEIVE_ENTITY", domain: domain, data: data, fieldDefinitions: getState().vre.collections[domain], errorMessage: errorMessage}), () =>
				dispatch({type: "RECEIVE_ENTITY_FAILURE", errorMessage: `Failed to fetch ${domain} with ID ${entityId}`}));



// 1) Fetch field description for the given domain
// 2) Dispatch NEW_ENTITY with field description for render
const makeNewEntity = (domain, errorMessage = null) =>
	(dispatch, getState) => dispatch({type: "NEW_ENTITY", domain: domain, data: null, fieldDefinitions: getState().vre.collections[domain], errorMessage: errorMessage});

const deleteEntity = () => (dispatch, getState) => {
	crud.deleteEntity(getState().entity.domain, getState().entity.data._id, getState().user.token, getState().vre.vreId, () =>
		dispatch(makeNewEntity(getState().entity.domain)), () =>
			dispatch(selectEntity(getState().entity.domain, getState().entity.data._id, `Failed to delete ${getState().entity.domain} with ID ${getState().entity.data._id}`)));
};

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
		crud.updateEntity(getState().entity.domain, saveData, getState().user.token, getState().vre.vreId, (err, resp) =>
			// 2) Save relations using server response for current relations to diff against relationData
			dispatch((redispatch) => saveRelations[config.apiVersion](JSON.parse(resp.body), relationData, getState().entity.fieldDefinitions, getState().user.token, getState().vre.vreId, () =>
				// 3) Refetch entity for render
				redispatch(selectEntity(getState().entity.domain, getState().entity.data._id)))), () =>
					// 2a) Handle error by refetching and passing along an error message
					dispatch(selectEntity(getState().entity.domain, getState().entity.data._id, `Failed to save ${getState().entity.domain} with ID ${getState().entity.data._id}`)));

	} else {
		// 1) Create new entity with saveData
		crud.saveNewEntity(getState().entity.domain, saveData, getState().user.token, getState().vre.vreId, (err, resp) =>
			// 2) Fetch entity via location header
			dispatch((redispatch) => crud.fetchEntity(resp.headers.location, (data) =>
				// 3) Save relations using server response for current relations to diff against relationData
				saveRelations[config.apiVersion](data, relationData, getState().entity.fieldDefinitions, getState().user.token, getState().vre.vreId, () =>
					// 4) Refetch entity for render
					redispatch(selectEntity(getState().entity.domain, data._id))))), () =>
						// 2a) Handle error by refetching and passing along an error message
						dispatch(makeNewEntity(getState().entity.domain, `Failed to save new ${getState().entity.domain}`)));
	}
};

export { saveEntity, selectEntity, makeNewEntity, deleteEntity };