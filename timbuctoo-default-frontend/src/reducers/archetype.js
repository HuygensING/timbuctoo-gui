const initialState = {};


export default function(state=initialState, action) {
  switch (action.type) {
    case "SET_ARCHETYPE_METADATA":
      return Object.keys(action.data)
        .map((collectionName) => ({
          collectionName: collectionName,
          properties: action.data[collectionName].properties
        })).reduce((accum, cur) => {
          accum[cur.collectionName] = cur.properties;
          return accum
        }, {});
  }

  return state;
}