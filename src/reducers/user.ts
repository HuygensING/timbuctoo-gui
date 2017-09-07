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
    loggedIn: hsid.length > 0
};

// actions
const LOG_OUT = 'LOG_OUT';

// reducer
export default (state: UserReducer = initialState, action: Action) => {
    switch (action.type) {
        case LOG_OUT:
            return loggedOutState;
        default:
            return state;
    }
};

// action creators
export const LogOutUser = () => {
    Cookies.remove(HSID);
    return {
        type: LOG_OUT
    };
};