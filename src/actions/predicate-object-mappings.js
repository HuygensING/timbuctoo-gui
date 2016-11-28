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

const setTargetDataset = (predicate, dataset) => (dispatch, getState) => {
  const {activeCollection: { name : subjectCollection }} = getState();

  const { predicateObjectMappings: allPredicateObjectMappings } = getState();

  const predicateObjectMappings = allPredicateObjectMappings[subjectCollection] || {};

  const predicateObjectMap = predicateObjectMappings.find((pom) => pom.predicate === predicate) || {};


  dispatch({
    type: "SET_PREDICATE_OBJECT_MAPPING",
    subjectCollection: subjectCollection,
    predicate: predicate,
    object: predicateObjectMap.objectMap || {},
    dataset: dataset,
    propertyType: "relation-to-existing"
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


const addCustomProperty = (name, type) => (dispatch, getState) => {
  const { activeCollection: { name: collectionName }} = getState();

  dispatch({
    type: "ADD_CUSTOM_PROPERTY",
    collection: collectionName,
    propertyName: name,
    propertyType: type
  });
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


export { addPredicateObjectMap, removePredicateObjectMap, addCustomProperty, removeCustomProperty, setTargetDataset }
