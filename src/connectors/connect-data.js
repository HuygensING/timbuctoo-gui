import { transformCollectionRows, transformCollectionColumns } from "./transformers/table";

const transformCollectionTabs = (collections, mappings, activeCollection) =>
  (collections || [])
    .filter((collection) => typeof mappings.collections[collection.name] !== "undefined")
    .map((collection) => ({
      collectionName: collection.name,
      archetypeName: mappings.collections[collection.name].archetypeName,
      active: activeCollection.name === collection.name,
      complete: false /* mappingsAreComplete(props, sheet) */
    }));

export default (appState, routed) => {

  const { collections } = appState.importData;
  const { mappings, activeCollection } = appState;

  return {
    // from router
    vreId: routed.params.vreId,
    // transformed for view
    tabs: transformCollectionTabs(collections, mappings, activeCollection),

    // mapping data
    mappings: appState.mappings,
    // messages
    showCollectionsAreConnectedMessage: appState.messages.showCollectionsAreConnectedMessage,

    // from active collection for table
    activeCollection: activeCollection.name,
    rows: transformCollectionRows(collections, activeCollection),
    headers: transformCollectionColumns(collections, activeCollection),
    nextUrl: activeCollection.nextUrl,

    // from import data
    uploadedFilename: appState.importData.uploadedFileName,
    vre: appState.importData.vre
  };
}