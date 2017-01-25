import {propertyMappingIsComplete} from "../../accessors/property-mappings";
import {uniq} from "../../util/uniq";
import {getColumnValue} from "../../accessors/property-mappings";

const mappingsAreComplete = (predicateObjectMappings) => {
  return predicateObjectMappings.length > 0 && predicateObjectMappings
    .filter((pom) => !propertyMappingIsComplete(pom))
    .length === 0;
};

const transformCollectionTabs = (collections, mappings, activeCollection, predicateObjectMappings) =>
  (collections || [])
    .filter((collection) => typeof mappings.collections[collection.name] !== "undefined")
    .filter((collection) => mappings.collections[collection.name].archetypeName !== null)
    .map((collection) => ({
      collectionName: collection.name,
      archetypeName: mappings.collections[collection.name].archetypeName,
      active: activeCollection.name === collection.name,
      complete: mappingsAreComplete(predicateObjectMappings[collection.name] || [])
    }));

export { transformCollectionTabs }