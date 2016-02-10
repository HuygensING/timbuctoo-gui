import store from "../store";
import fieldDefinitions from "../static/field-definitions";
import xhr from "xhr";

const getFieldDescription = (domain, dispatch) => dispatch({type: "NEW_ENTITY", domain: domain, fieldDefinitions: fieldDefinitions[domain]});

const saveEntity = () => (dispatch, getState) => {
	console.log(getState());
	xhr({
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-type": "application/json",
			"Authorization": getState().user.token
		},
		body: JSON.stringify(getState().entity.data),
		url: `/api/v2.1/domain/${getState().entity.domain}s`
	}, (err, resp, body) => {
		console.log(err, resp, body);
	});
};

const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

export default {
	onNew: (domain) => store.dispatch(redispatch => getFieldDescription(domain, redispatch)),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onSave: () => store.dispatch(saveEntity()),
	onLoginChange: (response) => store.dispatch(setUser(response))
};