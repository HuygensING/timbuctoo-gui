const initialState = {
  query: {
    searchFields: [],
    sortFields: []
  },
  results: {
    docs: [],
    facets: [],
    numFound: 0
  }
};

export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_SEARCH_STATE":
      return {...action.state};
  }
  return state;
}