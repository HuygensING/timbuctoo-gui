const initialState = {
  discovery: "",
  setDetails: [],
  pending: false
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_RS_DISCOVERY_URL":
      return {
        ...state,
        discovery: action.value
      };
    case "RECEIVE_RS_SET_DETAILS":
      return {
        ...state,
        setDetails: action.data,
        pending: false
      };
    case "RECEIVE_RS_ERROR":
      return {
        ...state,
        setDetails: [],
        pending: false
      };
    case "RS_PENDING":
      return {
        ...state,
        pending: true
      }
  }

  return state;
}