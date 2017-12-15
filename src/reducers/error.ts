import { GraphQLError } from 'graphql';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';

export type Errors = Array<Error | GraphQLError>;
export type ErrorReducer = {
    errors: Readonly<Errors>;
    query: string;
    variables: any;
    status: number;
};

const defaultState: ErrorReducer = {
    errors: [],
    query: '',
    variables: undefined,
    status: 0
};

interface SetErrorAction {
    type: 'SET_ERROR';
    payload: ErrorReducer;
    query: string;
    variables: any;
}

type Action = SetErrorAction | LocationChangeAction;

export default (state = defaultState, action: Action): ErrorReducer => {
    switch (action.type) {
        case 'SET_ERROR':
            const result = {
                ...action.payload
            };
            return result;
        case LOCATION_CHANGE:
            return defaultState;
        default:
            return state;
    }
};

export const setError = (errors: Errors, query: string, variables: any, status: number) => ({
    type: 'SET_ERROR',
    payload: {
        query,
        variables,
        errors,
        status
    }
});
