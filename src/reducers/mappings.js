import setIn from "../util/set-in";
import getIn from "../util/get-in";

const initialState = {
  collections: {},
  confirmed: false,
  publishing: false
};

function scaffoldCollectionMappings(init, sheet) {
  return Object.assign(init, {
    [sheet.name]: {
      archetypeName: null,
      ignoredColumns: []
    }
  });
}

const mapCollectionArchetype = (state, action) => {
  const newCollections = setIn([action.collection, "archetypeName"], action.value, state.collections);

  return {...state, collections: newCollections};
};

const toggleIgnoredColumn = (state, action) => {
  const current = getIn([action.collection, "ignoredColumns"], state.collections);

  if (current.indexOf(action.variableName) < 0) {
    return {
      ...state,
      collections: setIn([action.collection, "ignoredColumns"], current.concat(action.variableName), state.collections)
    };
  } else {
    return {
      ...state,
      collections: setIn([action.collection, "ignoredColumns"], current.filter((c) => c !== action.variableName), state.collections)
    };
  }
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

    case "TOGGLE_IGNORED_COLUMN":
      return toggleIgnoredColumn(state, action);

  }
  return state;
}
