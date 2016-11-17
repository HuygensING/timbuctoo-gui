const initialState = {
  query: {
    searchFields: [],
    sortFields: []
  },
  results: {
    docs: [],
    facets: [],
    numFound: 0
  },
  datasets: []
};

const receiveDatasets = (datasets) => datasets
  .filter((d) => d.name !== "Admin" && d.name !== "Base")
  .map((d) => d.name);

export default function(state=initialState, action) {
  switch (action.type) {
    case "RECEIVE_DATASETS":
      return {...state, datasets: receiveDatasets(action.datasets)};
    case "SET_SEARCH_STATE":
      return {...state, ...action.state};
  }
  return state;
}