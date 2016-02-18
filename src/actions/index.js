import store from "../store";
import { saveEntity, selectEntity, makeNewEntity } from "./entity";
import { setVre } from "./vre";

const setUser = (response) => {
	return {
		type: "SET_USER",
		user: response
	};
};

export default {
	onNew: (domain) => store.dispatch(makeNewEntity(domain)),
	onSelect: (record) => store.dispatch(selectEntity(record.domain, record.id)),
	onSave: () => store.dispatch(saveEntity()),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onLoginChange: (response) => store.dispatch(setUser(response)),
	onSelectVre: (vreId) => store.dispatch(setVre(vreId))
};