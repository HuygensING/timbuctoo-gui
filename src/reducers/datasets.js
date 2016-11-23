const initialState = {
  searchGuiUrl: undefined,
  publicVres: []
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_SEARCH_URL":
      return {
        ...state,
        searchGuiUrl: action.data
      };
    case "SET_PUBLIC_VRES":
      return {
        ...state,
        publicVres: action.payload
      }
  }

  return state;
}