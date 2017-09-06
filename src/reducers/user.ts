import { UserReducer } from '../typings/store';
import { Action } from '../typings/index';

// TODO: COMPLETE INITIAL REDUCER WITH ACTUAL DATA FROM CALL

const defaultState: UserReducer = {
    hsid: '',
    loggedIn: false,
    roles: []
};

// actions

// reducer
export default (state: UserReducer = defaultState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};