const initialState = {
  name: null,
  nextUrl: null,
  rows: [],
};

export default function(state=initialState, action) {
  switch (action.type) {
    case "FINISH_UPLOAD":
    case "PUBLISH_START":
      return {...initialState};
    case "RECEIVE_ACTIVE_COLLECTION":
      console.log(action.data.items);
      return {
        ...state,
        name: action.data.name,
        nextUrl: action.data._next,
        rows: action.data.name !== state.name
          ? action.data.items
          : state.rows.concat(action.data.items)
      };
  }

  return state;
}