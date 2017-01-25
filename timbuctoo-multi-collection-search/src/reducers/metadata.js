let initialState = {

};

export default function(state=initialState, action) {
  switch (action.type) {
    case "RECEIVE_METADATA":
      return action.metadata;
    default:
      return state;
  }
}