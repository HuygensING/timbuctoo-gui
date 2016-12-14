export default function(appState, routed) {
  const vreId = routed.params.vreId;
  const vreData = vreId ? (appState.userdata.myVres[vreId] || {}) : {};
  const vreLabel = vreData.label;
  return {
    newVreName: appState.newDataset.newVreName || vreLabel,
    uploadStatus: appState.importData.uploadStatus,
    publishState: vreData.publishState,
    vreId: vreId,
    uploadedFileName: appState.importData.uploadedFileName
  }
}