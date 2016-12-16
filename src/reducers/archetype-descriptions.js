const initialState = {};


export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_ARCHETYPE_METADATA":
      return Object.keys(action.data)
        .map((collectionName) => ({
          collectionName: collectionName,
          description: action.data[collectionName].description
        })).reduce((accum, cur) => {
          accum[cur.collectionName] = cur.description;
          return accum
        }, {});
  }

  return state;
}