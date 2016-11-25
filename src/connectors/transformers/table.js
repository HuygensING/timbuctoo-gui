import { propertyMappingIsComplete } from "../../validators/property-mappings"
import {getColumnValue} from "../../validators/property-mappings";

const sheetRowFromDictToArray = (rowdict, arrayOfVariableNames, mappingErrors) =>
  arrayOfVariableNames.map(name => ({
    value: rowdict[name],
    error: mappingErrors[name] || null
  }));


const getColumnInfo = (collections, activeCollection, mappings) => {
  const collectionInfo = (collections || []).find((coll) => coll.name === activeCollection.name);
  const columns = collectionInfo ? collectionInfo.variables : null;
  const ignoredColumns = mappings && mappings.collections[activeCollection.name] ?
    mappings.collections[activeCollection.name].ignoredColumns : [];


  return {columns: columns, ignoredColumns: ignoredColumns};
};

const transformCollectionRows = (collections, activeCollection, mappings) => {
  const { columns, ignoredColumns  } = getColumnInfo(collections, activeCollection, mappings);
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

const transformCollectionColumns = (collections, activeCollection, mappings, predicateObjectMappings = []) => {
  const { columns, ignoredColumns  } = getColumnInfo(collections, activeCollection, mappings);
  return (columns || []).map((column, i) => ({
    name: column,
    isConfirmed: propertyMappingIsComplete(predicateObjectMappings.find((pom) => getColumnValue(pom) === column)),
    isIgnored: ignoredColumns.indexOf(column) > -1
  }));
};

export {
  transformCollectionColumns,
  transformCollectionRows,
  getColumnInfo
}