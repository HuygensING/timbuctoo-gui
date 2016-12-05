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

    onComfirmDeleteVre: (vreId, userConfirmationInputValue) => {
      if (vreId === userConfirmationInputValue) {
        console.log("TODO: delete vre", vreId);
      }
    },

    // Mapping collections archetypes
    onMapCollectionArchetype: (collection, value) =>
      dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),


    // Connecting data
    onAddPredicateObjectMap: (predicateName, objectName, propertyType) =>
      dispatch(addPredicateObjectMap(predicateName, objectName, propertyType)),

    onRemovePredicateObjectMap: (predicateName, objectName) => dispatch(removePredicateObjectMap(predicateName, objectName)),

    onAddCustomProperty: (name, type) => dispatch(addCustomProperty(name, type)),

    onRemoveCustomProperty: (index) => dispatch(removeCustomProperty(index)),

    onPublishData: () => dispatch(publishMappings(navigateTo))
  };
}
