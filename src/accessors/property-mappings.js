const isBasicProperty = (predicateObjectMap) =>
  ["text", "select", "multiselect", "datable", "names", "sameAs"].indexOf(predicateObjectMap.propertyType) > -1;

const columnMapIsComplete = (predicateObjectMap) =>
  predicateObjectMap.objectMap &&
  typeof predicateObjectMap.objectMap.column !== "undefined" &&
  predicateObjectMap.objectMap.column !== null;

const joinConditionMapIsComplete = (predicateObjectMap) =>
  predicateObjectMap.objectMap &&
    predicateObjectMap.objectMap.parentTriplesMap &&
    predicateObjectMap.objectMap.joinCondition &&
    typeof predicateObjectMap.objectMap.joinCondition.parent !== "undefined" &&
    typeof predicateObjectMap.objectMap.joinCondition.child !== "undefined";

const propertyMappingIsComplete = (predicateObjectMap) => {
  if (typeof predicateObjectMap === "undefined") { return false; }

  if (isBasicProperty(predicateObjectMap)) {
    return columnMapIsComplete(predicateObjectMap);
  }

  if (predicateObjectMap.propertyType === "relation") {
    return joinConditionMapIsComplete(predicateObjectMap);
  }

  return false;
};

const getColumnValue = (predicateObjectMap) => {
  if (!predicateObjectMap) {
    return null;
  }

  if (isBasicProperty(predicateObjectMap)) {
    return predicateObjectMap.objectMap && predicateObjectMap.objectMap.column ? predicateObjectMap.objectMap.column : null;
  }

  if (predicateObjectMap.propertyType === "relation") {
    return predicateObjectMap.objectMap &&
      predicateObjectMap.objectMap.joinCondition &&
      predicateObjectMap.objectMap.joinCondition.child ? predicateObjectMap.objectMap.joinCondition.child : null;
  }

  return null;
};

export { propertyMappingIsComplete, isBasicProperty, getColumnValue }