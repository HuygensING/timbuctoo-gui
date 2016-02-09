import store from "../store";
import fieldDefinitions from "../static/field-definitions";


const getFieldDescription = (domain, dispatch) => dispatch({type: "NEW_ENTITY", domain: domain, fieldDefinitions: fieldDefinitions[domain]});

export default {
	onNew: (domain) => store.dispatch(redispatch => getFieldDescription(domain, redispatch)),
	onChange: (fieldPath, value) => store.dispatch({type: "SET_ENTITY_FIELD_VALUE", fieldPath: fieldPath, value: value})
};