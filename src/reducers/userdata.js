const initialState = {
  userId: undefined,
  myVres: undefined,
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.data
      };
  }

  return state;
}