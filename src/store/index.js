import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import reducers from "../reducers";
import thunkMiddleware from "redux-thunk";

export default createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);