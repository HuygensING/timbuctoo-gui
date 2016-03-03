import store from "../store";
import { saveEntity, selectEntity, makeNewEntity, deleteEntity } from "./entity";
import { deleteQuery, selectQuery, changeQuery, setQueryPath, addQueryFilter, deleteQueryFilter } from "./queries";
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
	onDelete: () => store.dispatch(deleteEntity()),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onLoginChange: (response) => store.dispatch(setUser(response)),
	onSelectVre: (vreId) => store.dispatch(setVre(vreId)),
	onSelectQuery: (domain, queryIndex) => store.dispatch(selectQuery(domain, queryIndex)),
	onDeleteQuery: (queryIndex) => store.dispatch(deleteQuery(queryIndex)),
	onSetQueryPath: (path) => store.dispatch(setQueryPath(path)),
	onQueryChange: (fieldPath, value) => store.dispatch(changeQuery(fieldPath, value)),
	onAddQueryFilter: (fieldPath, value) => store.dispatch(addQueryFilter(fieldPath, value)),
	onDeleteQueryFilter: (queryIndex) => store.dispatch(deleteQueryFilter(queryIndex))
};