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

    /*
        case "CONFIRM_COLLECTION_ARCHETYPE_MAPPINGS":
          return {...state, confirmed: true};

        case "SET_FIELD_MAPPING":
          return upsertFieldMapping(state, action);

        case "CLEAR_FIELD_MAPPING":
          return clearFieldMapping(state, action);

        case "SET_DEFAULT_VALUE":
          return setDefaultValue(state, action);

        case "CONFIRM_FIELD_MAPPINGS":
          return setFieldConfirmation(state, action, true);

        case "UNCONFIRM_FIELD_MAPPINGS":
          return setFieldConfirmation(state, action, false);

        case "SET_VALUE_MAPPING":
          return setValueMapping(state, action);

        case "ADD_CUSTOM_PROPERTY":
          return addCustomProperty(state, action);

        case "REMOVE_CUSTOM_PROPERTY":
          return removeCustomProperty(state, action);

        case "PUBLISH_STARTED":
          return {
            ...state,
            publishing: true
          };
        case "PUBLISH_FINISHED":
          return {
            ...state,
            publishing: false
          };*/
  }
  return state;
}
