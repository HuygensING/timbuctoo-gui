const initialState = {
  newVreName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "FINISH_UPLOAD":
      return {
        ...state,
        newVreName: null
      };
    case "SET_NEW_VRE_NAME":
      return {
        ...state,
        newVreName: action.newVreName.length > 0 ? action.newVreName : null
      }
  }

  return state;
}