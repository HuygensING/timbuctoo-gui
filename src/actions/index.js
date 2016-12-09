import store from "../store";
import { saveEntity, selectEntity, makeNewEntity, deleteEntity, fetchEntityList, paginateLeft, paginateRight, sendQuickSearch } from "./entity";
import { setVre } from "./vre";




export default (navigateTo, dispatch) => ({
	onNew: (domain) => store.dispatch(makeNewEntity(domain)),
	onSelect: (record) => store.dispatch(selectEntity(record.domain, record.id)),
	onSave: () => store.dispatch(saveEntity()),
	onDelete: () => store.dispatch(deleteEntity()),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onLoginChange: (response) => store.dispatch(setUser(response)),
	onSelectVre: (vreId) => store.dispatch(setVre(vreId)),
	onDismissMessage: (messageIndex) => store.dispatch({type: "DISMISS_MESSAGE", messageIndex: messageIndex}),
	onSelectDomain: (domain) => { store.dispatch({type: "SET_DOMAIN", domain}); store.dispatch(fetchEntityList(domain)); store.dispatch({type: "SET_QUICKSEARCH_QUERY", value: ""}); },
	onPaginateLeft: () => store.dispatch(paginateLeft()),
	onPaginateRight: () => store.dispatch(paginateRight()),
	onQuickSearchQueryChange: (value) => store.dispatch({type: "SET_QUICKSEARCH_QUERY", value: value}),
	onQuickSearch: () => store.dispatch(sendQuickSearch())
});