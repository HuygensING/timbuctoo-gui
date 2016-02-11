import clone from "clone-deep";
import xhr from "xhr";

import store from "../store";
import fieldDefinitions from "../static/field-definitions";

const getFieldDescription = (domain, actionType, data = null) => (dispatch) => dispatch({type: actionType, domain: domain, fieldDefinitions: fieldDefinitions[domain], data: data});

const fetchEntity = (location) => (dispatch) => {
	xhr({
		method: "GET",
		headers: {
			"Accept": "application/json"
		},
		url: location
	}, (err, resp, body) => {
		const data = JSON.parse(body);
		dispatch(getFieldDescription(data["@type"], "RECEIVE_ENTITY", data));
	});
};

const saveEntity = () => (dispatch, getState) => {
	let saveData = clone(getState().entity.data);
	delete saveData["@relations"];

	xhr({
		method: getState().entity.data._id ? "PUT" : "POST",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": getState().user.token,
			"VRE_ID": "WomenWriters"
		},
		body: JSON.stringify(saveData),
		url: `/api/v2.1/domain/${getState().entity.domain}s${getState().entity.data._id ? "/" + getState().entity.data._id : ""}`
	}, (err, resp, body) => {
		if(resp.statusCode === 201) {
			// POST RESPONSE --> FETCH ENTITY --> SAVE RELATIONS --> FETCH ENTITY
			dispatch(fetchEntity(resp.headers.location));
		} else if(resp.statusCode === 200) {
			// PUT RESPONSE --> SAVE RELATIONS --> FETCH ENTITY
			const data = JSON.parse(resp.body);
			dispatch(getFieldDescription(data["@type"], "RECEIVE_ENTITY", data));
		} else {
			console.log(err, resp, body);
		}
	});
};

const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

export default {
	onNew: (domain) => store.dispatch(getFieldDescription(domain, "NEW_ENTITY")),
	onSelect: (record) => store.dispatch(fetchEntity(`/api/v2.1/domain/${record.domain}s/${record.id}`)),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onSave: () => store.dispatch(saveEntity()),
	onLoginChange: (response) => store.dispatch(setUser(response))
};