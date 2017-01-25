import {getColumnValue} from "../accessors/property-mappings";
const initialState = { };

function setBasicPredicateObjectMap(action, collectionPredicateObjectMappings) {
  const predicateObjectMap = {
    predicate: action.predicate,
    objectMap: {
      column: action.object
    },
    propertyType: action.propertyType
  };

  return collectionPredicateObjectMappings
    .filter((predObjMap) => predObjMap.predicate !== action.predicate)
    .concat(predicateObjectMap);
}


function setRelationPredicateObjectMap(action, collectionPredicateObjectMappings) {
  const predicateObjectMap = {
    predicate: action.predicate,
    objectMap: action.object,
    propertyType: action.propertyType,
    dataset: action.dataset
  };

  return collectionPredicateObjectMappings
    .filter((predObjMap) => predObjMap.predicate !== action.predicate)
    .concat(predicateObjectMap);
}


const setPredicateObjectMapping = (state, action) => {
  const collectionPredicateObjectMappings = state[action.subjectCollection] || [];
  const newCollectionPredicateObjectMappings =
    action.propertyType === "relation"
      ? setRelationPredicateObjectMap(action, collectionPredicateObjectMappings)
      : setBasicPredicateObjectMap(action, collectionPredicateObjectMappings);

  return {
    ...state,
    [action.subjectCollection]: newCollectionPredicateObjectMappings
  };
};

const removePredicateObjectMapping = (state, action) => {
  const collectionPredicateObjectMappings = state[action.subjectCollection] || [];

  return action.predicate === "names" ?  {
    ...state,
    [action.subjectCollection]: collectionPredicateObjectMappings
      .filter((pom) => !(pom.propertyType === "names" && ["forename", "surname", "nameLink", "genName", "roleName"].indexOf(pom.predicate) > -1))
  } : {
    ...state,
    [action.subjectCollection]: collectionPredicateObjectMappings
      .filter((pom) => !(pom.predicate === action.predicate && getColumnValue(pom) === action.object))
  };
};

export default function(state=initialState, action) {
  switch (action.type) {
    case "FINISH_UPLOAD":
    case "RECEIVE_MY_VRES":
    case "CLEAR_PREDICATE_OBJECT_MAPPINGS":
      return initialState;
    case "SET_PREDICATE_OBJECT_MAPPING":
      return setPredicateObjectMapping(state, action);
    case "REMOVE_PREDICATE_OBJECT_MAPPING":
      return removePredicateObjectMapping(state, action);
  }

  return state;
}