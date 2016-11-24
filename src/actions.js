import { onUploadFileSelect } from "./actions/upload"
import { fetchBulkUploadedMetadata } from "./actions/fetch-bulkuploaded-metadata";

export default function actionsMaker(navigateTo, dispatch) {
  return {
    onUploadFileSelect: onUploadFileSelect(navigateTo, dispatch),

    onFetchBulkUploadedMetadata: (vreId, mappingsFromUrl) =>
      dispatch(fetchBulkUploadedMetadata(vreId, mappingsFromUrl)),

    onMapCollectionArchetype: (collection, value) =>
      dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collection, value: value}),

    onConfirmCollectionArchetypeMappings: () =>
      dispatch({type: "CONFIRM_COLLECTION_ARCHETYPE_MAPPINGS"}),

    onCloseMessage: (messageId) =>
      dispatch({type: "TOGGLE_MESSAGE", messageId: messageId})
  };
}
