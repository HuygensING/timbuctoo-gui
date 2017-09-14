import Cookies from 'js-cookie';

import { UserReducer } from '../typings/store';
import { Action } from '../typings/index';
import retrieveId from '../services/RetrieveId';
import { HSID } from '../constants/global';

const loggedOutState = {
    hsid: '',
    loggedIn: false
};

const hsid = retrieveId();
const initialState: UserReducer = {
    hsid,
    loggedIn: false
};

// actions
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

// reducer
export default (state: UserReducer = initialState, action: Action) => {
    switch (action.type) {
        case LOG_IN:
            Cookies.set(HSID, state.hsid);
            return {
                ...state,
                loggedIn: true
            };
        case LOG_OUT:
            return loggedOutState;
        default:
            return state;
    }
};

// action creators
export const LogInUser = () => {
    return {
        type: LOG_IN
    };
};

export const LogOutUser = () => {
    Cookies.remove(HSID);
    return {
        type: LOG_OUT
    };
};