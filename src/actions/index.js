import store from "../store";
import fieldDefinitions from "../static/field-definitions";
import xhr from "xhr";

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
	xhr({
		method: getState().entity.data._id ? "PUT" : "POST",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": getState().user.token
		},
		body: JSON.stringify(getState().entity.data),
		url: `/api/v2.1/domain/${getState().entity.domain}s${getState().entity.data._id ? "/" + getState().entity.data._id : ""}`
	}, (err, resp, body) => {
		if(resp.statusCode === 201) {
			dispatch(fetchEntity(resp.headers.location));
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