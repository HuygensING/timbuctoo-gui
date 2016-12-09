import { saveEntity, selectEntity, makeNewEntity, deleteEntity, fetchEntityList, paginateLeft, paginateRight, sendQuickSearch } from "./entity";
import { setVre } from "./vre";

export default (navigateTo, dispatch) => ({
	onNew: (domain) => dispatch(makeNewEntity(domain)),
	onSelect: (record) => dispatch(selectEntity(record.domain, record.id)),
	onSave: () => dispatch(saveEntity()),
	onDelete: () => dispatch(deleteEntity()),
	onChange: (fieldPath, value) => dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onLoginChange: (response) => dispatch(setUser(response)),
	onSelectVre: (vreId) => dispatch(setVre(vreId)),
	onDismissMessage: (messageIndex) => dispatch({type: "DISMISS_MESSAGE", messageIndex: messageIndex}),
	onSelectDomain: (domain) => { dispatch({type: "SET_DOMAIN", domain}); dispatch(fetchEntityList(domain)); dispatch({type: "SET_QUICKSEARCH_QUERY", value: ""}); },
	onPaginateLeft: () => dispatch(paginateLeft()),
	onPaginateRight: () => dispatch(paginateRight()),
	onQuickSearchQueryChange: (value) => dispatch({type: "SET_QUICKSEARCH_QUERY", value: value}),
	onQuickSearch: () => dispatch(sendQuickSearch())
});