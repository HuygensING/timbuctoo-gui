import { GraphQLError } from 'graphql';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';

export type Errors = Array<Error | GraphQLError>;
export type ErrorReducer = Readonly<Errors>;

const defaultState: ErrorReducer = [];

interface SetErrorAction {
    type: 'SET_ERROR';
    payload: ErrorReducer;
}

type Action = SetErrorAction | LocationChangeAction;

export default (state = defaultState, action: Action): ErrorReducer => {
    switch (action.type) {
        case 'SET_ERROR':
            return action.payload;
        case LOCATION_CHANGE:
            return defaultState;
        default:
            return state;
    }
};

export const setError = (errors: Errors) => ({
    type: 'SET_ERROR',
    payload: errors
});
