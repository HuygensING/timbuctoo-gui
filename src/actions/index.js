import store from "../store";
import { saveEntity, selectEntity, makeNewEntity, deleteEntity, fetchEntityList, paginateLeft, paginateRight, sendQuickSearch } from "./entity";
import {
	deleteQuery,
	selectQuery,
	changeQuery,
	setQueryPath,
	addQueryFilter,
	deleteQueryFilter,
	moveQueryPosition,
	submitQuery,
	nameQuery,
	saveQuery,
	loadQuery
} from "./queries";

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
	onDismissMessage: (messageIndex) => store.dispatch({type: "DISMISS_MESSAGE", messageIndex: messageIndex}),
	onSelectDomain: (domain) => { store.dispatch(fetchEntityList(domain)); store.dispatch({type: "SET_QUICKSEARCH_QUERY", value: ""}); },
	onPaginateLeft: () => store.dispatch(paginateLeft()),
	onPaginateRight: () => store.dispatch(paginateRight()),
	onQuickSearchQueryChange: (value) => store.dispatch({type: "SET_QUICKSEARCH_QUERY", value: value}),
	onQuickSearch: () => store.dispatch(sendQuickSearch()),

	onSelectQuery: (domain, queryIndex, position = null) => store.dispatch(selectQuery(domain, queryIndex, position)),
	onDeleteQuery: (queryIndex) => store.dispatch(deleteQuery(queryIndex)),
	onSetQueryPath: (path) => store.dispatch(setQueryPath(path)),
	onQueryChange: (fieldPath, value) => store.dispatch(changeQuery(fieldPath, value)),
	onAddQueryFilter: (fieldPath, value) => store.dispatch(addQueryFilter(fieldPath, value)),
	onDeleteQueryFilter: (queryIndex) => store.dispatch(deleteQueryFilter(queryIndex)),
	onMoveQueryPosition: (queryIndex, movement) => store.dispatch(moveQueryPosition(queryIndex, movement)),
	onSubmitQuery: () => store.dispatch(submitQuery()),
	onNameQuery: (value) => store.dispatch(nameQuery(value)),
	onSaveQuery: () => store.dispatch(saveQuery()),
	onLoadQuery: (name) => store.dispatch(loadQuery(name))
};