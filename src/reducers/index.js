import {combineReducers} from "redux";

import messages from "./messages";
import datasets from "./datasets";
import userdata from "./userdata";

export default combineReducers({
  messages: messages,
  datasets: datasets,
  userdata: userdata
});
