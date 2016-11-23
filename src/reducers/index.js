import {combineReducers} from "redux";

import messages from "./messages";
import datasets from "./datasets";

export default combineReducers({
  messages: messages,
  datasets: datasets
});
