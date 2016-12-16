import { transformCollectionRows, transformCollectionColumns } from "./transformers/table";
import generateRmlMapping from "../util/generate-rml-mapping";

export default (appState, routed) => {
  const { importData: { collections }} = appState;
  const { activeCollection, mappings } = appState;

  const vreData = routed.params.vreId ? (appState.userdata.myVres[routed.params.vreId] || {
    vreMetadata: {}
  }) : {
    vreMetadata: {}
  };
  const { label: vreLabel, vreMetadata: { uploadedFilename }} = vreData;

  return {
    vreId: routed.params.vreId,
    vreLabel: vreLabel,
    collections: appState.importData.collections,
    uploadedFileName: uploadedFilename,
    archetype: appState.archetype,
    archetypeDescriptions: appState.archetypeDescriptions,
    mappings: appState.mappings,
    showFileIsUploadedMessage: appState.messages.showFileIsUploadedMessage,
    vre: appState.importData.vre,

    // from active collection for table
    activeCollection: activeCollection.name,
    rows: transformCollectionRows(collections, activeCollection),
    headers: transformCollectionColumns(collections, activeCollection, mappings),
    nextUrl: activeCollection.nextUrl,

    // ctrl-shift-F4
    rmlPreviewData:
      appState.previewRml.showRMLPreview ?
        generateRmlMapping(appState.importData.vre, appState.mappings.collections, [])
        : null
  };
}