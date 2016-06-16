import {createStore, applyMiddleware, combineReducers} from "redux";
import reducers from "./index";
import thunkMiddleware from "redux-thunk";
import { persist } from "./persist";

const logger = () => next => action => {
	if (action.hasOwnProperty("type")) {
		console.log("[REDUX]", action.type, action);
	}
	return next(action);
};

let data = combineReducers(reducers);

let store = createStore(data, applyMiddleware(logger, thunkMiddleware));

window.onbeforeunload = () => persist(store.getState());

export default store;