import setIn from "../util/set-in";

const initialState = {
  collections: {},
  confirmed: false,
  publishing: false
};

function scaffoldCollectionMappings(init, sheet) {
  return Object.assign(init, {
    [sheet.name]: {
      archetypeName: null
    }
  });
}

const mapCollectionArchetype = (state, action) => {
  const newCollections = setIn([action.collection, "archetypeName"], action.value, state.collections);

  return {...state, collections: newCollections};
};


export default function(state=initialState, action) {
  switch (action.type) {
    case "START_UPLOAD":
      return initialState;

    case "FINISH_UPLOAD":
      return {
        ...state,
        collections: action.data.collections.reduce(scaffoldCollectionMappings, {})
      };

    case "MAP_COLLECTION_ARCHETYPE":
      return mapCollectionArchetype(state, action);

    case "MAP_COLLECTION_ARCHETYPES":
      return {
        ...state,
        collections: action.data
      };

  }
  return state;
}
