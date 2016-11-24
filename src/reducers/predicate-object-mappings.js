const initialState = { };

const setPredicateObjectMapping = (state, action) => {
  const collectionPredicateObjectMappings = state[action.subjectCollection] || [];

  const predicateObjectMap = {
    predicate: action.predicate,
    objectMap: {
      column: action.object
    },
    propertyType: action.propertyType
  };

  const newCollectionPredicateObjectMappings = collectionPredicateObjectMappings
    .filter((predObjMap) => predObjMap.predicate !== action.predicate)
    .concat(predicateObjectMap);


  return {
    ...state,
    [action.subjectCollection]: newCollectionPredicateObjectMappings
  };
};

const removePredicateObjectMapping = (state, action) => {
  const collectionPredicateObjectMappings = state[action.subjectCollection] || [];

  return {
    ...state,
    [action.subjectCollection]: collectionPredicateObjectMappings.filter((pom) => pom.predicate !== action.predicate)
  };
};

export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_PREDICATE_OBJECT_MAPPING":
      return setPredicateObjectMapping(state, action);
    case "REMOVE_PREDICATE_OBJECT_MAPPING":
      return removePredicateObjectMapping(state, action);
  }

  return state;
}