const initialState = { };

const setPredicateObjectMapping = (state, action) => {
  const collectionPredicateObjectMappings = state[action.subjectCollection] || [];

  const predicateObjectMap = {
    predicate: action.predicate,
    objectMap: {
      column: action.object
    }
  };

  const newCollectionPredicateObjectMappings = collectionPredicateObjectMappings
    .filter((predObjMap) => predObjMap.predicate !== action.predicate)
    .concat(predicateObjectMap)


  return {
    ...state,
    [action.subjectCollection]: newCollectionPredicateObjectMappings
  };
};

export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_PREDICATE_OBJECT_MAPPING":
      return setPredicateObjectMapping(state, action);

  }

  return state;
}