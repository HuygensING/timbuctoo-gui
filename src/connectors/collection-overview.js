export default function(appState) {
  return {
    userId: appState.userdata.userId,
    vres: appState.userdata.myVres || {},
    searchGuiUrl: appState.datasets.searchGuiUrl,
    uploadStatus: appState.importData.uploadStatus,
    showDeleteVreModalFor: appState.datasets.vreIdOfDeleteVreModal,
    showDeleteVreFailedMessage: appState.messages.showDeleteVreFailedMessage,
    showUploadDialog: appState.uploadDialog.showUploadDialog,
    newVreName: appState.uploadDialog.newVreName
  }
}