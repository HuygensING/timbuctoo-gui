let initialState = {
  data: null
};

export default function(state=initialState, action) {
  switch (action.type) {
    case "RECEIVE_ENTITY":
      return {
        ...state,
        data: action.entity
      };
    case "START_ENTITY_FETCH":
      return {
        data: null
      };
    default:
      return state;
  }
}