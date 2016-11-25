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

export { propertyMappingIsComplete, isBasicProperty }