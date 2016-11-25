const isBasicProperty = (predicateObjectMap) =>
  ["text", "select", "multiselect", "datable", "names"].indexOf(predicateObjectMap.propertyType) > -1;

const columnMapIsComplete = (predicateObjectMap) =>
  predicateObjectMap.objectMap &&
  typeof predicateObjectMap.objectMap.column !== "undefined" &&
  predicateObjectMap.objectMap.column !== null;

const propertyMappingIsComplete = (predicateObjectMap) => {
  if (typeof predicateObjectMap === "undefined") { return false; }

  if (isBasicProperty(predicateObjectMap)) {
    return columnMapIsComplete(predicateObjectMap);
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