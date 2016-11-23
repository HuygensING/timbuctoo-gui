import {combineReducers} from "redux";

import messages from "./messages";
import datasets from "./datasets";
import userdata from "./userdata";
import importData from "./import-data";

export default combineReducers({
  messages: messages,
  datasets: datasets,
  userdata: userdata,
  importData: importData
});
