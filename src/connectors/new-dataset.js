export default function(appState) {
  return {
    newVreName: appState.newDataset.newVreName,
    uploadStatus: appState.importData.uploadStatus
  }
}