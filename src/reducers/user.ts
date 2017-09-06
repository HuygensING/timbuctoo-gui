import { IUserReducer } from '../typings/store';
import { Action } from '../typings/index';

const defaultState: IUserReducer = {
    loggedIn: false,
    roles: []
};

// actions

// reducer
export default (state: IUserReducer = defaultState, action: Action) => {
    switch (action.type) {
        default:
            return state;
    }
};