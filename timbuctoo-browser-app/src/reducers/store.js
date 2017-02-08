import { createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import sampleReducer from  "./reducer";

const reducers = combineReducers({ 
	sample: sampleReducer
});

// export default createStore(
// 	reducers,
// 	compose(applyMiddleware(thunkMiddleware))
// );



// import {createStore, applyMiddleware} from "redux";
// import thunkMiddleware from "redux-thunk";
    
// import reducers from "./reducers";

const logger = () => next => action => {
  if (action.hasOwnProperty("type")) {
    console.log("[REDUX]", action.type, action);
  }

  return next(action);
};

let createStoreWithMiddleware = applyMiddleware(/*logger,*/ thunkMiddleware)(createStore);
export default createStoreWithMiddleware(reducers);
