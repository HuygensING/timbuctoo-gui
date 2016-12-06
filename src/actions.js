import { onUploadFileSelect } from "./actions/upload"
import { fetchBulkUploadedMetadata } from "./actions/fetch-bulkuploaded-metadata";
import { selectCollection } from "./actions/select-collection";
import {
  addPredicateObjectMap,
  removePredicateObjectMap,
  addCustomProperty,
  removeCustomProperty,
} from "./actions/predicate-object-mappings";

import { publishMappings } from "./actions/publish-mappings";

import { deleteVre } from "./actions/delete-vre";

export default function actionsMaker(navigateTo, dispatch) {
  return {
    onUploadFileSelect: onUploadFileSelect(navigateTo, dispatch),

    // loading import data
    onSelectCollection: (collection) => dispatch(selectCollection(collection)),
    onLoadMoreClick: (nextUrl, collection) => dispatch(selectCollection(collection, nextUrl)),
    onFetchBulkUploadedMetadata: (vreId, mappingsFromUrl) => dispatch(fetchBulkUploadedMetadata(vreId, mappingsFromUrl)),

    // Closing informative messages
    onCloseMessage: (messageId) => dispatch({type: "TOGGLE_MESSAGE", messageId: messageId}),

    // Deleting own vres
    onDeleteVreClick: (vreId) => dispatch({type: "SHOW_DELETE_VRE_MODAL", vreId: vreId}),

    onComfirmDeleteVre: (vreId, userConfirmationInputValue) => dispatch(deleteVre(vreId, userConfirmationInputValue)),

    // Mapping collections archetypes
    onMapCollectionArchetype: (collection, value) =>
      dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),


    // Connecting data
    onAddPredicateObjectMap: (predicateName, objectName, propertyType) =>
      dispatch(addPredicateObjectMap(predicateName, objectName, propertyType)),

    onRemovePredicateObjectMap: (predicateName, objectName) => dispatch(removePredicateObjectMap(predicateName, objectName)),

    onAddCustomProperty: (name, type, sourceColumn = null, targetColumn = null) =>
      dispatch(addCustomProperty(name, type, sourceColumn, targetColumn)),

    onRemoveCustomProperty: (index) => dispatch(removeCustomProperty(index)),

    onPublishData: () => dispatch(publishMappings(navigateTo))
  };
}
