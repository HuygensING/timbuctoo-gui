const initialState = {
  showUploadDialog: false,
  newVreName: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "OPEN_UPLOAD_DIALOG":
      return {
        ...state,
        showUploadDialog: true,
        newVreName: null
      };
    case "CLOSE_UPLOAD_DIALOG":
    case "FINISH_UPLOAD":
      return {
        ...state,
        showUploadDialog: false,
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