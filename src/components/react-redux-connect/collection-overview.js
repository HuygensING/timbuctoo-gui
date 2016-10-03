export default function(appState) {
  return {
    isUploading: appState.importData.isUploading,
    userId: appState.userdata.userId,
    vres: appState.userdata.myVres || {},
    searchGuiUrl: appState.userdata.searchGuiUrl
  }
}