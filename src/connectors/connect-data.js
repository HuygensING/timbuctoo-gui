function sheetRowFromDictToArray(rowdict, arrayOfVariableNames, mappingErrors) {
  return arrayOfVariableNames.map(name => ({
    value: rowdict[name],
    error: mappingErrors[name] || null
  }));
}

const transformCollectionRows = (activeCollection, columns, ignoredColumns) =>
  activeCollection.name && columns
    ? activeCollection.rows
        .map((row) =>
          sheetRowFromDictToArray(row.values, columns, row.errors)
            .map((cell, colIdx) => ({
              ...cell, ignored: ignoredColumns.indexOf(columns[colIdx]) > -1
            }))
        )
    : [];

const transformCollectionColumns = (columns, ignoredColumns) =>
  (columns || []).map((column, i) => ({
    name: column,
    isConfirmed: false /*ignoredColumns.indexOf(i) < 0 && confirmedCols.indexOf(i) > -1*/,
    isIgnored: ignoredColumns.indexOf(column) > -1
  }));

export default (appState, routed) => {

  const { collections } = appState.importData;
  const { mappings, activeCollection } = appState;

  const tabs = (collections || [])
    .filter((collection) => typeof mappings.collections[collection.name] !== "undefined" )
    .map((collection) => ({
      collectionName: collection.name,
      archetypeName: mappings.collections[collection.name].archetypeName,
      active: activeCollection.name === collection.name,
      complete: false /* mappingsAreComplete(props, sheet) */
    }));

  const collectionInfo = (collections || []).find((coll) => coll.name === activeCollection.name);
  const columns = collectionInfo ? collectionInfo.variables : null;
  const ignoredColumns = collectionInfo ? collectionInfo.ignoredColumns || [] : null;

  return {
    // from router
    vreId: routed.params.vreId,
    // transformed for view
    tabs: tabs,
    // mapping data
    mappings: appState.mappings,
    // messages
    showCollectionsAreConnectedMessage: appState.messages.showCollectionsAreConnectedMessage,
    // from active collection for table
    activeCollection: activeCollection.name,
    rows: transformCollectionRows(activeCollection, columns, ignoredColumns),
    headers: transformCollectionColumns(columns, ignoredColumns),
    nextUrl: activeCollection.nextUrl,
    // from import data
    uploadedFilename: appState.importData.uploadedFileName,
    vre: appState.importData.vre
  };
}