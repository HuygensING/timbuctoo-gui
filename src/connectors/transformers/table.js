const sheetRowFromDictToArray = (rowdict, arrayOfVariableNames, mappingErrors) =>
  arrayOfVariableNames.map(name => ({
    value: rowdict[name],
    error: mappingErrors[name] || null
  }));


const getColumnInfo = (collections, activeCollection) => {
  const collectionInfo = (collections || []).find((coll) => coll.name === activeCollection.name);
  const columns = collectionInfo ? collectionInfo.variables : null;
  const ignoredColumns = collectionInfo ? collectionInfo.ignoredColumns || [] : null;
  return {columns: columns, ignoredColumns: ignoredColumns};
}

const transformCollectionRows = (collections, activeCollection) => {
  const { columns, ignoredColumns  } = getColumnInfo(collections, activeCollection);
  return activeCollection.name && columns
    ? activeCollection.rows
    .map((row) =>
      sheetRowFromDictToArray(row.values, columns, row.errors)
        .map((cell, colIdx) => ({
          ...cell, ignored: ignoredColumns.indexOf(columns[colIdx]) > -1
        }))
    )
    : [];
};

const transformCollectionColumns = (collections, activeCollection) => {
  const { columns, ignoredColumns  } = getColumnInfo(collections, activeCollection);
  return (columns || []).map((column, i) => ({
    name: column,
    isConfirmed: false /*ignoredColumns.indexOf(i) < 0 && confirmedCols.indexOf(i) > -1*/,
    isIgnored: ignoredColumns.indexOf(column) > -1
  }));
};

export {
  transformCollectionColumns,
  transformCollectionRows
}