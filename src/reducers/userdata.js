const initialState = {
  userId: undefined,
  myVres: undefined,
  vres: {}, 
  searchGuiUrl: undefined
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.data,
        myVres: action.vreData ? action.vreData.mine : {},
        vres: action.vreData ? action.vreData.public : {}
      };
    case "SET_SEARCH_URL":
      return {
        ...state,
        searchGuiUrl: action.data
      };
  }

  return state;
}