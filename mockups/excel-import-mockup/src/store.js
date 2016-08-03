import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";

import { persist } from "./util/persist";
import reducers from "./reducers";

let store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

window.onbeforeunload = () => persist(store.getState());

export default store;
