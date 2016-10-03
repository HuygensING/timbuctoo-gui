export default function(appState) {
 return {
   userId: appState.userdata.userId,
   uploadStatus: appState.importData.uploadStatus
 }
}