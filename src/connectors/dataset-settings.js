export default function(appState, routed) {
  const vreId = routed.params.vreId;
  const vreData = vreId ? (appState.userdata.myVres[vreId] || {
    vreMetadata: {}
  }) : {
    vreMetadata: {}
  };
  const { label: vreLabel, vreMetadata: { provenance, colorCode, description, image, uploadedFilename }} = vreData;
  return {
    newVreName: appState.datasetSettings.newVreName || vreLabel,
    newDescription: appState.datasetSettings.description === null ? description : appState.datasetSettings.description,
    newProvenance:  appState.datasetSettings.provenance === null ? provenance : appState.datasetSettings.provenance,
    newColorCode: appState.datasetSettings.colorCode === null ? colorCode : appState.datasetSettings.colorCode,
    uploadStatus: appState.importData.uploadStatus,
    publishState: vreData.publishState,
    vreId: vreId,
    uploadedFileName: appState.importData.uploadedFileName,
    uploadedFilenameFromVre: uploadedFilename,
    imageUploadStatus: appState.datasetSettings.imageUploadStatus,
    imageUploadErrorMessage: appState.datasetSettings.imageUploadErrorMessage,
    imageUrl: image
  }
}