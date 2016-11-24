import { transformCollectionRows, transformCollectionColumns } from "./transformers/table";

export default (appState, routed) => {
  const { importData: { collections }} = appState;
  const { activeCollection, mappings } = appState;

  return {
    vreId: routed.params.vreId,
    collections: appState.importData.collections,
    uploadedFileName: appState.importData.uploadedFileName,
    archetype: appState.archetype,
    mappings: appState.mappings,
    showFileIsUploadedMessage: appState.messages.showFileIsUploadedMessage,
    vre: appState.importData.vre,

    // from active collection for table
    activeCollection: activeCollection.name,
    rows: transformCollectionRows(collections, activeCollection),
    headers: transformCollectionColumns(collections, activeCollection, mappings),
    nextUrl: activeCollection.nextUrl,

  };
}