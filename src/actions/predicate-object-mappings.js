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

const removePredicateObjectMap = (predicate) => (dispatch, getState) => {
  const {activeCollection: { name : subjectCollection }} = getState();

  dispatch({
    type: "REMOVE_PREDICATE_OBJECT_MAPPING",
    subjectCollection: subjectCollection,
    predicate: predicate
  })
};

export { addPredicateObjectMap, removePredicateObjectMap }
