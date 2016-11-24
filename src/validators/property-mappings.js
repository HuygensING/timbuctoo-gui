const columnMapIsComplete = (predicateObjectMap) =>
  predicateObjectMap.objectMap &&
  typeof predicateObjectMap.objectMap.column !== "undefined" &&
  predicateObjectMap.objectMap.column !== null;

const propertyMappingIsComplete = (predicateObjectMap) => {
  if (typeof predicateObjectMap === "undefined") { return false; }

  if (["text", "select", "multiselect", "datable"].indexOf(predicateObjectMap.propertyType) > -1) {
    return columnMapIsComplete(predicateObjectMap);
  }

  return false;
};

export { propertyMappingIsComplete }