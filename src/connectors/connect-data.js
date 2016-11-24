import { transformCollectionRows, transformCollectionColumns, getColumnInfo } from "./transformers/table";

const transformCollectionTabs = (collections, mappings, activeCollection) =>
  (collections || [])
    .filter((collection) => typeof mappings.collections[collection.name] !== "undefined")
    .map((collection) => ({
      collectionName: collection.name,
      archetypeName: mappings.collections[collection.name].archetypeName,
      active: activeCollection.name === collection.name,
      complete: false /* mappingsAreComplete(props, sheet) */
    }));

export default (appState, routed) => {

  const { collections } = appState.importData;
  const { mappings, activeCollection, archetype, predicateObjectMappings : allPredicateObjectmappings } = appState;

  const predicateObjectMappings = allPredicateObjectmappings[activeCollection.name] || []

  return {
    // from router
    vreId: routed.params.vreId,
    // transformed for view
    tabs: transformCollectionTabs(collections, mappings, activeCollection),

    // mapping data
    mappings: appState.mappings,

    // messages
    showCollectionsAreConnectedMessage: appState.messages.showCollectionsAreConnectedMessage,

    // from active collection for table
    activeCollection: activeCollection.name,
    rows: transformCollectionRows(collections, activeCollection, mappings),
    headers: transformCollectionColumns(collections, activeCollection, mappings, predicateObjectMappings),
    nextUrl: activeCollection.nextUrl,

    // from import data
    uploadedFilename: appState.importData.uploadedFileName,
    vre: appState.importData.vre,

    // form data
    archetypeFields: mappings.collections[activeCollection.name] ? archetype[mappings.collections[activeCollection.name].archetypeName] : [],
    columns: getColumnInfo(collections, activeCollection, mappings).columns,
    ignoredColumns: getColumnInfo(collections, activeCollection, mappings).ignoredColumns,
    predicateObjectMappings: predicateObjectMappings
  };
}