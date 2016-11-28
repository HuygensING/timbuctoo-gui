import {combineReducers} from "redux";

import messages from "./messages";
import datasets from "./datasets";
import userdata from "./userdata";
import importData from "./import-data";
import archetype from "./archetype";
import mappings from "./mappings";
import activeCollection from "./active-collection";
import predicateObjectMappings from "./predicate-object-mappings";
import customProperties from "./custom-properties";
import previewRml from "./preview-rml";

export default combineReducers({
  messages: messages,
  datasets: datasets,
  userdata: userdata,
  importData: importData,
  archetype: archetype,
  mappings: mappings,
  activeCollection:  activeCollection,
  predicateObjectMappings: predicateObjectMappings,
  customProperties: customProperties,
  previewRml: previewRml
});
