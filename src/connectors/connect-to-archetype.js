export default (appState, routed) => {

  return {
    vreId: routed.params.vreId,
    collections: appState.importData.collections,
    activeCollection: appState.activeCollection.name,
    uploadedFileName: appState.importData.uploadedFileName,
    archetype: appState.archetype,
    mappings: appState.mappings,
    showFileIsUploadedMessage: appState.messages.showFileIsUploadedMessage,
    vre: appState.importData.vre
  };
}