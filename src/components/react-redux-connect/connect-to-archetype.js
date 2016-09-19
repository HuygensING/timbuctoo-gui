export default (appState) => ({
  mappings: appState.mappings,
  sheets: appState.importData.sheets,
  uploadedFileName: appState.importData.uploadedFileName,
  archetype: appState.archetype,
  onMapCollectionArchetype: appState.onMapCollectionArchetype,
  onConfirmCollectionArchetypeMappings: appState.onConfirmCollectionArchetypeMappings,
  showFileIsUploadedMessage: appState.messages.showFileIsUploadedMessage
});