import {getColumnValue} from "../accessors/property-mappings";
const addPredicateObjectMap = (predicate, object, propertyType) => (dispatch, getState) => {
  const {activeCollection: { name : subjectCollection }} = getState();

  dispatch({
    type: "SET_PREDICATE_OBJECT_MAPPING",
    subjectCollection: subjectCollection,
    predicate: predicate,
    object: object,
    propertyType: propertyType
  })
};

const removePredicateObjectMap = (predicate, object) => (dispatch, getState) => {
  const {activeCollection: { name : subjectCollection }} = getState();

  dispatch({
    type: "REMOVE_PREDICATE_OBJECT_MAPPING",
    subjectCollection: subjectCollection,
    predicate: predicate,
    object: object
  });
};


const addCustomProperty = (name, type, sourceColumn, targetColumn) => (dispatch, getState) => {
  const { activeCollection: { name: collectionName }} = getState();

  dispatch({
    type: "ADD_CUSTOM_PROPERTY",
    collection: collectionName,
    propertyName: name,
    propertyType: type
  });

  if (type === "relation" && sourceColumn && targetColumn) {
    dispatch({
      type: "SET_PREDICATE_OBJECT_MAPPING",
      subjectCollection: collectionName,
      predicate: name,
      object: {
        joinCondition: {
          child: sourceColumn,
          parent: targetColumn.split("!")[1]
        },
        parentTriplesMap: targetColumn.split("!")[0]
      },
      propertyType: "relation"
    });
  }
};

const removeCustomProperty = (index) => (dispatch, getState) => {
  const {
    activeCollection: { name: collectionName },
    predicateObjectMappings: allPredicateObjectMappings,
    customProperties: customProperties
  } = getState();

  const predicateObjectMappings = allPredicateObjectMappings[collectionName] || [];
  const customProperty = customProperties[collectionName][index];

  const predicateObjectMapping = predicateObjectMappings.find((pom) => pom.predicate === customProperty.propertyName);

  if (predicateObjectMapping) {
    dispatch({
      type: "REMOVE_PREDICATE_OBJECT_MAPPING",
      subjectCollection: collectionName,
      predicate: customProperty.propertyName,
      object: getColumnValue(predicateObjectMapping)
    });
  }
  dispatch({
    type: "REMOVE_CUSTOM_PROPERTY",
    collection: collectionName,
    index: index
  })
};

const deserializeSavedRmlMapping = (savedMappings) => (dispatch, getState) => {
  const graph = savedMappings["@graph"];
  console.log(graph);
};

export { addPredicateObjectMap, removePredicateObjectMap, addCustomProperty, removeCustomProperty, deserializeSavedRmlMapping }
