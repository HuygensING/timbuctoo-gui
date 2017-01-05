import { saveEntity, selectEntity, makeNewEntity, deleteEntity, addFieldsToEntity,
	selectDomain, paginateLeft, paginateRight, sendQuickSearch } from "./entity";
import { setVre } from "./vre";

export default (navigateTo, dispatch) => ({
	onNew: (domain) => dispatch(makeNewEntity(domain)),
	onSelect: (record) => dispatch(selectEntity(record.domain, record.id)),
	onSave: () => dispatch(saveEntity()),
	onDelete: () => dispatch(deleteEntity()),
	onChange: (fieldPath, value) => dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value}),
	onAddSelectedFields: (fields) => dispatch(addFieldsToEntity(fields)),


	onLoginChange: (response) => dispatch(setUser(response)),
	onSelectVre: (vreId) => dispatch(setVre(vreId)),
	onDismissMessage: (messageIndex) => dispatch({type: "DISMISS_MESSAGE", messageIndex: messageIndex}),
	onSelectDomain: (domain) => {
		dispatch(selectDomain(domain));
	},
	onPaginateLeft: () => dispatch(paginateLeft()),
	onPaginateRight: () => dispatch(paginateRight()),
	onQuickSearchQueryChange: (value) => dispatch({type: "SET_QUICKSEARCH_QUERY", value: value}),
	onQuickSearch: () => dispatch(sendQuickSearch())
});