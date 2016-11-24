const columnMapIsComplete = (predicateObjectMap) =>
  predicateObjectMap.objectMap && predicateObjectMap.objectMap.column;

const propertyMappingIsComplete = (type, predicateObjectMap) => {
  if (typeof predicateObjectMap === "undefined") { return false; }

  if (["text", "select", "multiselect", "datable"].indexOf(type) > -1) {
    return columnMapIsComplete(predicateObjectMap);
  }

  return false;
};

export { propertyMappingIsComplete }