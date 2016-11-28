import { transformCollectionRows, transformCollectionColumns, getColumnInfo } from "./transformers/table";
import { transformCollectionTabs } from "./transformers/tabs"

function getTargetableVres(mine, vres) {
  const myVres = Object.keys(mine || {})
    .map((key) => mine[key])
    .filter((vre) => vre.published)
    .map((vre) => vre.name);
  const publicVres = Object.keys(vres || {})
    .map((key) => vres[key].name);

  return myVres.concat(publicVres);
}

export default (appState, routed) => {

  const { collections } = appState.importData;
  const { mappings, activeCollection, archetype, customProperties,
    predicateObjectMappings : allPredicateObjectMappings } = appState;

  const { userdata: { myVres }, datasets: { publicVres }} = appState;

  const predicateObjectMappings = allPredicateObjectMappings[activeCollection.name] || [];

  const archetypeFields = mappings.collections[activeCollection.name] ?
    archetype[mappings.collections[activeCollection.name].archetypeName] : [];

  const columnHeaders = transformCollectionColumns(collections, activeCollection, mappings, predicateObjectMappings);

  const collectionTabs = transformCollectionTabs(collections, mappings, activeCollection, allPredicateObjectMappings);

  const availableArchetypes = Object.keys(mappings.collections).map((key) => mappings.collections[key].archetypeName);

  const availableCollectionColumnsPerArchetype = availableArchetypes.map((archetypeName) => ({
    key: archetypeName,
    values: Object.keys(mappings.collections)
      .filter((collectionName) => mappings.collections[collectionName].archetypeName === archetypeName)
      .map((collectionName) => ({
        collectionName: collectionName,
        columns: collections.find((coll) => coll.name === collectionName).variables
      }))
  })).reduce((accum, cur) => ({...accum, [cur.key]: cur.values}), {});

  console.log("--- Mapping preview ---");
  console.log(JSON.stringify(allPredicateObjectMappings, null, 2));

  return {
    // from router
    vreId: routed.params.vreId,
    // transformed for view
    tabs: collectionTabs,

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
    uploadStatus: appState.importData.uploadStatus,
    uploadedFilename: appState.importData.uploadedFileName,
    vre: appState.importData.vre,

    // form data
    archetypeFields: archetypeFields,
    availableArchetypes: availableArchetypes,
    availableCollectionColumnsPerArchetype: availableCollectionColumnsPerArchetype,
    columns: getColumnInfo(collections, activeCollection, mappings).columns,
    ignoredColumns: getColumnInfo(collections, activeCollection, mappings).ignoredColumns,
    predicateObjectMappings: predicateObjectMappings,
    publishErrors: appState.importData.publishErrors,
    publishEnabled: !appState.importData.publishing && collectionTabs.every(tab => tab.complete),
    publishStatus: appState.importData.publishStatus || "Publish dataset",
    customProperties: customProperties[activeCollection.name] || [],
    targetableVres: getTargetableVres(myVres, publicVres),

  };
}