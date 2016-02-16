import store from "../store";

import {
	saveEntity,
	selectEntity,
	makeNewEntity
} from "./entity";




const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

export default {
	onNew: (domain) => store.dispatch((redispatch) => makeNewEntity(domain, redispatch)),
	onSelect: (record) => store.dispatch((redispatch) => selectEntity(record, redispatch)),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onSave: () => store.dispatch(saveEntity()),
	onLoginChange: (response) => store.dispatch(setUser(response))
};