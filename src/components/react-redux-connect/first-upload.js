export default function(appState) {
 return {
   userId: appState.userdata.userId,
   isUploading: appState.importData.isUploading
 }
}