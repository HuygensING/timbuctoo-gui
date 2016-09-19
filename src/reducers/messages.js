const initialState = {
  showFileIsUploadedMessage: true,
  showCollectionsAreConnectedMessage: true
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "TOGGLE_MESSAGE":
      const newState = {...state};
      newState[action.messageId] = !state[action.messageId]
      return newState;
  }

  return state;
}