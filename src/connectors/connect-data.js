export default (appState, routed) => {

  const { collections } = appState.importData;
  const { mappings, activeCollection } = appState;

  const tabs = (collections || [])
    .filter((collection) => typeof mappings.collections[collection.name] !== "undefined" )
    .map((collection) => ({
      collectionName: collection.name,
      archetypeName: mappings.collections[collection.name].archetypeName,
      active: activeCollection.name === collection.name,
      complete: false /* mappingsAreComplete(props, sheet) */
    }));

  return {
    // from router
    vreId: routed.params.vreId,
    // transformed for view
    tabs: tabs,
    // mapping data
    mappings: appState.mappings,
    // messages
    showCollectionsAreConnectedMessage: appState.messages.showCollectionsAreConnectedMessage,
    // from import data
    uploadedFileName: appState.importData.uploadedFileName,
    vre: appState.importData.vre
  };
}