import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";

import { persist } from "../util/persist";
import reducers from "./index";

const logger = store => next => action => {
  let result = next(action)
	console.log("[REDUX]", action.type, action, store.getState());
  return result
}

let data = combineReducers(reducers);

let store = createStore(data, applyMiddleware(logger, thunkMiddleware));

window.onbeforeunload = () => persist(store.getState());

export default store;
