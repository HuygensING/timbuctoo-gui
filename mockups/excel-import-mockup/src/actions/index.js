import store from "../reducers/store";

export default {
	onUpload: () => store.dispatch({type: "UPLOAD"}),
	onSelectCollection: (collection) => store.dispatch({type: "SET_ACTIVE_COLLECTION", collection: collection}),
	onSelectVariable: (variable) => store.dispatch({type: "SET_ACTIVE_VARIABLE", variable: variable}),
	onUpdateVariable: (key, value) => store.dispatch({type: "UPDATE_VARIABLE", value: value, key: key}),
	onUpdateVariableTypeSpec: (key, value) => store.dispatch({type: "UPDATE_VARIABLE_TYPE_SPEC", value: value, key: key})
};