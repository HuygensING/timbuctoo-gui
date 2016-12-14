const initialState = {
  newVreName: null,
  provenance: null,
  description: null,
  colorCode: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "CLEAR_DATASET_SETTINGS":
      return {
        ...initialState
      };
    case "FINISH_UPLOAD":
      return {
        ...state,
        newVreName: null
      };
    case "SET_NEW_VRE_NAME":
      return {
        ...state,
        newVreName: action.newVreName.length > 0 ? action.newVreName : null
      };
    case "SET_PROVENANCE":
      return {
        ...state,
        provenance: action.provenance
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.description
      };
    case "SET_COLOR_CODE":
      return {
        ...state,
        colorCode: action.colorCode
      };
  }

  return state;
}