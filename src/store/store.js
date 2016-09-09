import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import metadataReducer from "./metadata-reducer";
import solrReducer from "./solr-reducer";

const reducers = {
	metadata: metadataReducer,
	solr: solrReducer
};

const data = combineReducers(reducers);

const store = createStore(data, {}, applyMiddleware(thunkMiddleware),
	window.devToolsExtension ? window.devToolsExtension() : f => f);

export default store;
