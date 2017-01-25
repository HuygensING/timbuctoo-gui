const initialState = {
  showRMLPreview: false
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "PREVIEW_RML":
      return {
        ...state,
        showRMLPreview: true
      };
    case "HIDE_RML_PREVIEW":
      return {
        ...state,
        showRMLPreview: false
      };
  }

  return state;
}