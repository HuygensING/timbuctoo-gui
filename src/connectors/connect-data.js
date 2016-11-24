import { transformCollectionRows, transformCollectionColumns, getColumnInfo } from "./transformers/table";
import { transformCollectionTabs } from "./transformers/tabs"

export default (appState, routed) => {

  const { collections } = appState.importData;
  const { mappings, activeCollection, archetype, predicateObjectMappings : allPredicateObjectmappings } = appState;

  const predicateObjectMappings = allPredicateObjectmappings[activeCollection.name] || [];

  const archetypeFields = mappings.collections[activeCollection.name] ?
    archetype[mappings.collections[activeCollection.name].archetypeName] : [];

  const columnHeaders = transformCollectionColumns(collections, activeCollection, mappings, predicateObjectMappings);

  return {
    // from router
    vreId: routed.params.vreId,
    // transformed for view
    tabs: transformCollectionTabs(collections, mappings, activeCollection, allPredicateObjectmappings),

    // mapping data
    mappings: appState.mappings,

    // messages
    showCollectionsAreConnectedMessage: appState.messages.showCollectionsAreConnectedMessage,

    // from active collection for table
    activeCollection: activeCollection.name,
    rows: transformCollectionRows(collections, activeCollection, mappings),
    headers: columnHeaders,
    nextUrl: activeCollection.nextUrl,

    // from import data
    uploadedFilename: appState.importData.uploadedFileName,
    vre: appState.importData.vre,

    // form data
    archetypeFields: archetypeFields,
    columns: getColumnInfo(collections, activeCollection, mappings).columns,
    ignoredColumns: getColumnInfo(collections, activeCollection, mappings).ignoredColumns,
    predicateObjectMappings: predicateObjectMappings
  };
}