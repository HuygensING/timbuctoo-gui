import { transformCollectionRows, transformCollectionColumns, getColumnInfo } from "./transformers/table";
import { transformCollectionTabs } from "./transformers/tabs"
import generateRmlMapping from "../util/generate-rml-mapping";
import {uniq} from "../util/uniq";
import PublishState from "../util/publish-state";

function getTargetableVres(mine, vres, activeVre) {
  const myVres = Object.keys(mine || {})
    .map((key) => mine[key])
    .filter((vre) => vre.published)
    .map((vre) => vre.name);
  const publicVres = Object.keys(vres || {})
    .map((key) => vres[key].name);

  return myVres.concat(publicVres).reduce(uniq, []).filter(vre => vre !== activeVre);
}

export default (appState, routed) => {

  const { collections } = appState.importData;
  const { mappings, activeCollection, archetype, customProperties,
    predicateObjectMappings : allPredicateObjectMappings } = appState;

  const { userdata: { myVres }, datasets: { publicVres }} = appState;

  const predicateObjectMappings = allPredicateObjectMappings[activeCollection.name] || [];

  const archetypeName = (mappings.collections[activeCollection.name] || {}).archetypeName;
  const archetypeFields = archetypeName !== null && mappings.collections[activeCollection.name] ?
    archetype[archetypeName] : [];

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

  return {
    // from router
    vreId: routed.params.vreId,
    // transformed for view
    tabs: collectionTabs,

    // messages
    showCollectionsAreConnectedMessage: appState.messages.showCollectionsAreConnectedMessage,

    // from active collection for table
    activeCollection: activeCollection.name,
    firstMappedCollection: archetypeName === null && collectionTabs.length > 0 ? collectionTabs[0].collectionName : null,
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
    predicateObjectMappings: predicateObjectMappings,
    publishErrors: appState.importData.publishErrors,
    publishEnabled: !appState.importData.publishing && collectionTabs.every(tab => tab.complete),
    publishStatus: appState.importData.publishStatus || "Publish dataset",
    customProperties: customProperties[activeCollection.name] || [],
    targetableVres: getTargetableVres(myVres, publicVres, appState.importData.vre),
    hasMappingErrors: myVres[routed.params.vreId].publishState === PublishState.MAPPING_CREATION_AFTER_ERRORS,

    // ctrl-shift-F4
    rmlPreviewData:
      appState.previewRml.showRMLPreview ?
        generateRmlMapping(appState.importData.vre, appState.mappings.collections, allPredicateObjectMappings)
        : null
  };
}