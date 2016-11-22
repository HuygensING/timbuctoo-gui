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
  .map((d) => typeof d === "object" ? d.name : d)
  .filter((d) => d !== "Admin" && d !== "Base");

export default function(state=initialState, action) {
  switch (action.type) {
    case "RECEIVE_DATASETS":
      return {...state, datasets: receiveDatasets(action.datasets)};
    case "SET_SEARCH_STATE":
      return {...state, ...action.state};
  }
  return state;
}