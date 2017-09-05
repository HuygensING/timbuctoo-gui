import { IUserReducer } from '../typings/store';
import { IAction } from '../typings/index';

const defaultState: IUserReducer = {
    loggedIn: false,
    roles: []
};

// actions

// reducer
export default (state: IUserReducer = defaultState, action: IAction) => {
    switch (action.type) {
        default:
            return state;
    }
};