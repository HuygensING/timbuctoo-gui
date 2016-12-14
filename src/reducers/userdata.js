const initialState = {
  userId: undefined,
  myVres: undefined,
};


export default function(state=initialState, action) {
  let newMyVres;

  switch (action.type) {
    case "RECEIVE_MY_VRES":
      return {
        ...state,
        userId: action.data,
        myVres: action.vreData ? action.vreData.mine : null,
      };
    case "BEFORE_DELETE_VRE":
      newMyVres = {...state.myVres};
      if (newMyVres[action.vreId]) {
        newMyVres[action.vreId].deletePending = true;
      }
      return {
        ...state,
        myVres: newMyVres
      };
    case "DELETE_VRE_ERROR":
      newMyVres = {...state.myVres};
      if (newMyVres[action.vreId]) {
        newMyVres[action.vreId].deletePending = false;
      }
      return {
        ...state,
        myVres: newMyVres
      };
  }

  return state;
}