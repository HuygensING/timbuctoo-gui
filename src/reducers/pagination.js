const initialState = {
  pages: [],
  idMap: {},
  requestTime: null
};

const makeIdMap = (docs) => docs.reduce((accum, cur, curIdx) => {
  accum[cur.id] = curIdx;
  return accum;
}, {});

export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_PAGINATION":
      if (!state.requestTime || state.requestTime < action.requestTime) {
        return {
          ...state,
          pages: action.docs,
          idMap: makeIdMap(action.docs),
          requestTime: action.requestTime
        };
      }
      break;
    case "CLEAR_PAGINATION":
      return {
        ...state,
        pages: [],
        idMap: {}
      }
  }
  return state;
}