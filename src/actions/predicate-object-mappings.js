import {getColumnValue} from "../accessors/property-mappings";
import {nameSpaces} from "../util/generate-rml-mapping";
import {defaultNamespace} from "../util/generate-rml-mapping";


const _addPredicateObjectMap = (subjectCollection, predicate, object, propertyType) => (dispatch) => {
  dispatch({
    type: "SET_PREDICATE_OBJECT_MAPPING",
    subjectCollection: subjectCollection,
    predicate: predicate,
    object: object,
    propertyType: propertyType
  })
};


const addPredicateObjectMap = (predicate, object, propertyType) => (dispatch, getState) => {
  const {activeCollection: { name : subjectCollection }} = getState();

  dispatch(_addPredicateObjectMap(subjectCollection, predicate, object, propertyType));
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

const _addCustomProperty = (collectionName, name, type, sourceColumn = null, targetColumn = null) => (dispatch) => {
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

const addCustomProperty = (name, type, sourceColumn, targetColumn) => (dispatch, getState) => {
  const { activeCollection: { name: collectionName }} = getState();

  dispatch(_addCustomProperty(collectionName, name, type, sourceColumn, targetColumn));
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

const stripNamespace = (uri) => {
  const nsList = Object.keys(nameSpaces).map((k) => nameSpaces[k]).concat(defaultNamespace);
  for (let i in nsList) {
    if (uri.indexOf(nsList[i]) > -1) {
      return uri.replace(nsList[i], "");
    }
  }
  return null;
};

const getPropertyType = (predicate, knownProperties) => {
  if (nameSpaces[predicate] === "http://www.tei-c.org/ns/1.0/") { return "names"; }
  const knownProperty = knownProperties.find((prop) => prop.name === predicate);

  if (knownProperty) {
    return knownProperty.type;
  }
  return "text";
};

const deserializeSavedRmlMapping = (savedMappings) => (dispatch, getState) => {
  const graph = savedMappings["@graph"];
  const { archetype : archetypeProperties } = getState();

  for (let i in graph) {
    const collectionMapping = graph[i];
    const collectionName = collectionMapping["rml:logicalSource"]["rml:source"]["tim:rawCollection"];
    const archetypeName = stripNamespace(collectionMapping["http://www.w3.org/2000/01/rdf-schema#subClassOf"]) + "s";

    dispatch({type: "MAP_COLLECTION_ARCHETYPE", collection: collectionName, value: archetypeName});

    const knownProperties = archetypeProperties[archetypeName]
      .filter((prop) => prop.type !== "relation")
      .concat({name: "sameAs", type: "sameAs"});

    collectionMapping.predicateObjectMap.forEach((predicateObjectMapping) => {
      if (typeof predicateObjectMapping.objectMap === "undefined") { return; }
      const predicate = stripNamespace(predicateObjectMapping.predicate);
      const { objectMap } = predicateObjectMapping;

      if (objectMap.column) {
        dispatch(_addPredicateObjectMap(collectionName, predicate, objectMap.column, getPropertyType(predicate, knownProperties)));

        if (getPropertyType(predicate, knownProperties) !== "names" && knownProperties.map((prop) => prop.name).indexOf(predicate) < 0) {
          dispatch(_addCustomProperty(collectionName, predicate, "text"))
        }
      } else if (objectMap.joinCondition && objectMap.parentTriplesMap) {
        const targetCollection = stripNamespace(objectMap.parentTriplesMap).replace(/.+\//,"")
        dispatch(_addCustomProperty(collectionName, predicate, "relation", objectMap.joinCondition.child, `${targetCollection}!${objectMap.joinCondition.parent}`));
      }
    })

  }
};

export { addPredicateObjectMap, removePredicateObjectMap, addCustomProperty, removeCustomProperty, deserializeSavedRmlMapping }
