import { onUploadFileSelect } from "./actions/upload"
import { fetchBulkUploadedMetadata } from "./actions/fetch-bulkuploaded-metadata";
import { selectCollection } from "./actions/select-collection";
import {
  addPredicateObjectMap,
  removePredicateObjectMap,
  addCustomProperty,
  removeCustomProperty,
} from "./actions/predicate-object-mappings";

import { publishMappings, saveMappingState, saveNewMappingState } from "./actions/publish-mappings";

import { deleteVre } from "./actions/delete-vre";
import {saveDatasetSettings} from "./actions/upload";

export default function actionsMaker(navigateTo, dispatch) {
  return {

    // loading import data
    onUploadFileSelect: onUploadFileSelect(navigateTo, dispatch),


    onClearFormSettingData: () => dispatch({type: "CLEAR_DATASET_SETTINGS"}),
    onSetNewVreName: (value) => dispatch({type: "SET_NEW_VRE_NAME", newVreName: value}),
    onSetNewDescription: (value) => dispatch({type: "SET_DESCRIPTION", description: value}),
    onSetNewProvenance: (value) => dispatch({type: "SET_PROVENANCE", provenance: value}),
    onSetNewColorCode: (value) => dispatch({type: "SET_COLOR_CODE", colorCode: value}),

    onSaveVreSettings: (vreId, next = () => {}) => dispatch(saveDatasetSettings(vreId, next)),

    // Fetching raw data
    onSelectCollection: (collection) => dispatch(selectCollection(collection)),

    onLoadMoreClick: (nextUrl, collection) => dispatch(selectCollection(collection, nextUrl)),

    onFetchBulkUploadedMetadata: (vreId) => dispatch(fetchBulkUploadedMetadata(vreId)),

    // Closing informative messages
    onCloseMessage: (messageId) => dispatch({type: "TOGGLE_MESSAGE", messageId: messageId}),

    // Deleting own vres
    onDeleteVreClick: (vreId) => dispatch({type: "SHOW_DELETE_VRE_MODAL", vreId: vreId}),

    onComfirmDeleteVre: (vreId, userConfirmationInputValue) => dispatch(deleteVre(vreId, userConfirmationInputValue)),

    // Mapping collections archetypes
    onMapCollectionArchetype: (collection, value) =>
      dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),


    // Connecting data
    onContinueMapping: (vreId) => dispatch(fetchBulkUploadedMetadata(vreId, navigateTo)),

    onAddPredicateObjectMap: (predicateName, objectName, propertyType) =>
      dispatch(addPredicateObjectMap(predicateName, objectName, propertyType)),

    onRemovePredicateObjectMap: (predicateName, objectName) => dispatch(removePredicateObjectMap(predicateName, objectName)),

    onAddCustomProperty: (name, type, sourceColumn = null, targetColumn = null) =>
      dispatch(addCustomProperty(name, type, sourceColumn, targetColumn)),

    onRemoveCustomProperty: (index) => dispatch(removeCustomProperty(index)),

    onSaveMappingState: () => dispatch(saveMappingState()),

    onSaveNewMappingState: () => dispatch(saveNewMappingState(navigateTo)),

    onPublishData: () => dispatch(publishMappings(navigateTo))
  };
}
