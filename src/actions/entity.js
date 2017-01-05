import clone from "../util/clone-deep";
import { crud } from "./crud";
import saveRelations from "./save-relations";
import autocomplete from "./autocomplete";

// Skeleton base data per field definition
const initialData = {
	names: [],
	multiselect: [],
	links: [],
	keyword: [],
	"list-of-strings": [],
	altnames: [],
	text: "",
	string: "",
	select: "",
	datable: ""
};

// Return the initial data for the type in the field definition
const initialDataForType = (fieldDef) =>
	fieldDef.defaultValue || (fieldDef.type === "relation" || fieldDef.type === "keyword" ? {} : initialData[fieldDef.type]);

const addFieldsToEntity = (fields) => (dispatch) => {
	fields.forEach((field) => {
		if (field.type === "relation") {
			dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: ["@relations", field.name], value: []});
		} else {
			dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: [field.name], value: initialDataForType(field)});
		}
	})
};

const fetchEntityList = (domain) => (dispatch, getState) => {
	dispatch({type: "SET_PAGINATION_START", start: 0});
	crud.fetchEntityList(domain, 0, getState().quickSearch.rows, (data) => dispatch({type: "RECEIVE_ENTITY_LIST", data: data}));
};

const paginateLeft = () => (dispatch, getState) => {
	const newStart = getState().quickSearch.start - getState().quickSearch.rows;
	dispatch({type: "SET_PAGINATION_START", start: newStart < 0 ? 0 : newStart});
	crud.fetchEntityList(getState().entity.domain, newStart < 0 ? 0 : newStart, getState().quickSearch.rows, (data) => dispatch({type: "RECEIVE_ENTITY_LIST", data: data}));
};

const paginateRight = () => (dispatch, getState) => {
	const newStart = getState().quickSearch.start + getState().quickSearch.rows;
	dispatch({type: "SET_PAGINATION_START", start: newStart});
	crud.fetchEntityList(getState().entity.domain, newStart, getState().quickSearch.rows, (data) => dispatch({type: "RECEIVE_ENTITY_LIST", data: data}));
};

const sendQuickSearch = () => (dispatch, getState) => {
	const { quickSearch, entity, vre } = getState();
	if (quickSearch.query.length) {
		dispatch({type: "SET_PAGINATION_START", start: 0});
		const callback = (data) => dispatch({type: "RECEIVE_ENTITY_LIST", data: data.map((d) => (
			{
				_id: d.key.replace(/.*\//, ""),
				"@displayName": d.value
			}
		))});
		autocomplete(`domain/${entity.domain}/autocomplete`, quickSearch.query, callback);
	} else {
		dispatch(fetchEntityList(entity.domain));
	}
};

const selectDomain = (domain) => (dispatch) => {
	dispatch({type: "SET_DOMAIN", domain});
	dispatch(fetchEntityList(domain));
	dispatch({type: "SET_QUICKSEARCH_QUERY", value: ""});
};

// 1) Fetch entity
// 2) Dispatch RECEIVE_ENTITY for render
const selectEntity = (domain, entityId, errorMessage = null, successMessage = null, next = () => { }) =>
	(dispatch, getState) => {
		const { entity: { domain: currentDomain } } = getState();
		if (currentDomain !== domain) {
			dispatch(selectDomain(domain));
		}
		dispatch({type: "BEFORE_FETCH_ENTITY"})
		crud.fetchEntity(`${process.env.server}/v2.1/domain/${domain}/${entityId}`, (data) => {
			dispatch({type: "RECEIVE_ENTITY", domain: domain, data: data, errorMessage: errorMessage});
			if (successMessage !== null) {
				dispatch({type: "SUCCESS_MESSAGE", message: successMessage});
			}
		}, () => dispatch({type: "RECEIVE_ENTITY_FAILURE", errorMessage: `Failed to fetch ${domain} with ID ${entityId}`}));
		next();
	};


// 1) Dispatch RECEIVE_ENTITY with empty entity skeleton for render
const makeNewEntity = (domain, errorMessage = null) =>
	(dispatch, getState) => dispatch({
		type: "RECEIVE_ENTITY",
		domain: domain,
		data: {"@relations": {}},
		errorMessage: errorMessage
	});

const deleteEntity = () => (dispatch, getState) => {
	crud.deleteEntity(getState().entity.domain, getState().entity.data._id, getState().user.token, getState().vre.vreId,
		() => {
			dispatch({type: "SUCCESS_MESSAGE", message: `Sucessfully deleted ${getState().entity.domain} with ID ${getState().entity.data._id}`});
			dispatch(makeNewEntity(getState().entity.domain));
			dispatch(fetchEntityList(getState().entity.domain));
		},
		() => dispatch(selectEntity(getState().entity.domain, getState().entity.data._id, `Failed to delete ${getState().entity.domain} with ID ${getState().entity.data._id}`)));
};

// 1) Save an entity
// 2) Save the relations for this entity
// 3) Refetch entity for render
const saveEntity = () => (dispatch, getState) => {
	const collectionLabel = getState().vre.collections[getState().entity.domain].collectionLabel.replace(/s$/, "");

	// Make a deep copy of the data to be saved in order to leave application state unaltered
	let saveData = clone(getState().entity.data);
	// Make a deep copy of the relation data in order to leave application state unaltered
	let relationData = clone(saveData["@relations"]) || {};
	// Delete the relation data from the saveData as it is not expected by the server
	delete saveData["@relations"];

	if (getState().entity.data._id) {
		// 1) Update the entity with saveData
		crud.updateEntity(getState().entity.domain, saveData, getState().user.token, getState().vre.vreId, (err, resp) =>
			// 2) Save relations using server response for current relations to diff against relationData
			dispatch((redispatch) => saveRelations(JSON.parse(resp.body), relationData, getState().vre.collections[getState().entity.domain].properties, getState().user.token, getState().vre.vreId, () =>
				// 3) Refetch entity for render
				redispatch(selectEntity(getState().entity.domain, getState().entity.data._id, null, `Succesfully saved ${collectionLabel} with ID ${getState().entity.data._id}`, () => dispatch(fetchEntityList(getState().entity.domain)))))), () =>
					// 2a) Handle error by refetching and passing along an error message
					dispatch(selectEntity(getState().entity.domain, getState().entity.data._id, `Failed to save ${collectionLabel} with ID ${getState().entity.data._id}`)));

	} else {
		// 1) Create new entity with saveData
		crud.saveNewEntity(getState().entity.domain, saveData, getState().user.token, getState().vre.vreId, (err, resp) =>
			// 2) Fetch entity via location header
			dispatch((redispatch) => crud.fetchEntity(resp.headers.location, (data) =>
				// 3) Save relations using server response for current relations to diff against relationData
				saveRelations(data, relationData, getState().vre.collections[getState().entity.domain].properties, getState().user.token, getState().vre.vreId, () =>
					// 4) Refetch entity for render
					redispatch(selectEntity(getState().entity.domain, data._id, null, `Succesfully saved ${collectionLabel}`, () => dispatch(fetchEntityList(getState().entity.domain))))))), () =>
						// 2a) Handle error by refetching and passing along an error message
						dispatch(makeNewEntity(getState().entity.domain, `Failed to save new ${collectionLabel}`)));
	}
};


export { saveEntity, selectEntity, makeNewEntity, deleteEntity, fetchEntityList, paginateRight, paginateLeft, sendQuickSearch, selectDomain, addFieldsToEntity };