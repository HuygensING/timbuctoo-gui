import {propertyMappingIsComplete} from "../../validators/property-mappings";
import {uniq} from "../../util/uniq";

const mappingsAreComplete = (allColumns, ignoredColumns, predicateObjectMappings) => {
  const evaluateColumns = allColumns.filter((col) => ignoredColumns.indexOf(col) < 0);
  const mappedColumns = predicateObjectMappings
    .filter((pom) => propertyMappingIsComplete(pom))
    .map((pom) => pom.objectMap.column ? pom.objectMap.column : "TODO")
    .reduce(uniq, []);

  return evaluateColumns.length <= mappedColumns.length;
};

const transformCollectionTabs = (collections, mappings, activeCollection, predicateObjectMappings) =>
  (collections || [])
    .filter((collection) => typeof mappings.collections[collection.name] !== "undefined")
    .map((collection) => ({
      collectionName: collection.name,
      archetypeName: mappings.collections[collection.name].archetypeName,
      active: activeCollection.name === collection.name,
      complete: mappingsAreComplete(
        collection.variables,
        mappings.collections[collection.name].ignoredColumns,
        predicateObjectMappings[collection.name] || []
      )
    }));

export { transformCollectionTabs }