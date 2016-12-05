const initialState = {
  searchGuiUrl: undefined,
  publicVres: [],
  vreIdOfDeleteVreModal: null
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
      };
    case "SHOW_DELETE_VRE_MODAL":
      return {
        ...state,
        vreIdOfDeleteVreModal: action.vreId
      }
  }

  return state;
}