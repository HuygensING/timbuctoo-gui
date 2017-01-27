const initialState = {
  newVreName: null,
  provenance: null,
  description: null,
  colorCode: null,
  imageUploadStatus: null,
  imageUploadErrorMessage: null
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
    case "IMAGE_UPLOAD_STARTED":
      return {
        ...state,
        imageUploadStatus: "Uploading image..."
      };
    case "IMAGE_UPLOAD_ERROR":
      return {
        ...state,
        imageUploadErrorMessage: action.message
      };
    case "IMAGE_UPLOAD_SUCCESS":
    case "DISMISS_IMAGE_ERROR":
      return {
        ...state,
        imageUploadErrorMessage: null
      };
    case "IMAGE_UPLOAD_FINISHED":
      return {
        ...state,
        imageUploadStatus: null
      }
  }

  return state;
}