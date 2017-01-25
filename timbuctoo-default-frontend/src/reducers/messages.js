const initialState = {
  showFileIsUploadedMessage: true,
  showCollectionsAreConnectedMessage: true,
  showDeleteVreFailedMessage: false
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "TOGGLE_MESSAGE":
      const newState = {...state};
      newState[action.messageId] = !state[action.messageId];
      return newState;
    case "FINISH_UPLOAD":
      return initialState;
    case "DELETE_VRE_ERROR":
      const newState1 = {...state};
      newState1.showDeleteVreFailedMessage = true;
      return newState1;
  }

  return state;
}