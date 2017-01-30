import {combineReducers} from "redux";

import messages from "./messages";
import datasets from "./datasets";
import userdata from "./userdata";
import importData from "./import-data";
import archetype from "./archetype";
import archetypeDescriptions from "./archetype-descriptions";
import mappings from "./mappings";
import activeCollection from "./active-collection";
import predicateObjectMappings from "./predicate-object-mappings";
import customProperties from "./custom-properties";
import previewRml from "./preview-rml";
import datasetSettings from "./dataset-settings";
import resourceSync from "./resource-sync";

export default combineReducers({
  messages: messages,
  datasets: datasets,
  userdata: userdata,
  importData: importData,
  archetype: archetype,
  archetypeDescriptions: archetypeDescriptions,
  mappings: mappings,
  activeCollection:  activeCollection,
  predicateObjectMappings: predicateObjectMappings,
  customProperties: customProperties,
  previewRml: previewRml,
  datasetSettings: datasetSettings,
  resourceSync: resourceSync
});
