export default function(appState) {
  return {
    userId: appState.userdata.userId,
    vres: appState.userdata.myVres || {},
    searchGuiUrl: appState.datasets.searchGuiUrl,
    showDeleteVreModalFor: appState.datasets.vreIdOfDeleteVreModal,
    showDeleteVreFailedMessage: appState.messages.showDeleteVreFailedMessage
  }
}