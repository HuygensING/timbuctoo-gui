import { propertyMappingIsComplete } from "../../accessors/property-mappings"
import {getColumnValue} from "../../accessors/property-mappings";

const sheetRowFromDictToArray = (rowdict, arrayOfVariableNames, mappingErrors) =>
  arrayOfVariableNames.map(name => ({
    value: rowdict[name],
    error: mappingErrors[name] || null
  }));


const getColumnInfo = (collections, activeCollection, mappings) => {
  const collectionInfo = (collections || []).find((coll) => coll.name === activeCollection.name);
  const columns = collectionInfo ? collectionInfo.variables : null;

  return {columns: columns};
};

const transformCollectionRows = (collections, activeCollection, mappings) => {
  const { columns  } = getColumnInfo(collections, activeCollection, mappings);
  return activeCollection.name && columns
    ? activeCollection.rows
    .map((row) => sheetRowFromDictToArray(row.values, columns, row.errors))
    : [];
};

const transformCollectionColumns = (collections, activeCollection, mappings, predicateObjectMappings = []) => {
  const { columns} = getColumnInfo(collections, activeCollection, mappings);
  return (columns || []).map((column, i) => ({
    name: column,
    isConfirmed: propertyMappingIsComplete(predicateObjectMappings.find((pom) => getColumnValue(pom) === column))
  }));
};

export {
  transformCollectionColumns,
  transformCollectionRows,
  getColumnInfo
}