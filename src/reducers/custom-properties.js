const initialState = { };

const addCustomProperty = (state, action) => {
  const collectionCustomProperties = state[action.collection] || [];

  const customProperty = {
    propertyType: action.propertyType,
    propertyName: action.propertyName,
  };

  return {
    ...state,
    [action.collection]: collectionCustomProperties.concat(customProperty)
  };
};

const removeCustomProperty = (state, action) => {
  const collectionCustomProperties = state[action.collection] || [];

  return {
    ...state,
    [action.collection]: collectionCustomProperties.filter((prop, idx) => idx !== action.index)
  }
};

export default function(state=initialState, action) {
  switch (action.type) {
    case "FINISH_UPLOAD":
    case "LOGIN":
      return initialState;
    case "ADD_CUSTOM_PROPERTY":
      return addCustomProperty(state, action);
    case "REMOVE_CUSTOM_PROPERTY":
      return removeCustomProperty(state, action);
  }

  return state;
}