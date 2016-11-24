const addPredicateObjectMap = (predicate, object) => (dispatch, getState) => {
  const {activeCollection: { name : subjectCollection }} = getState();
  const { predicateObjectMappings } = getState();

  dispatch({
    type: "SET_PREDICATE_OBJECT_MAPPING",
    subjectCollection: subjectCollection,
    predicate: predicate,
    object: object
  })
};

const removePredicateObjectMap = (predicate) => (dispatch, getState) => {
  console.log(predicate);
};

export { addPredicateObjectMap, removePredicateObjectMap }
