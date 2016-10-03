export default function(appState) {
  return {
    userId: appState.userdata.userId,
    vres: appState.userdata.myVres || {},
    searchGuiUrl: appState.userdata.searchGuiUrl,
    uploadStatus: appState.importData.uploadStatus
  }
}