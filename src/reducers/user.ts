import Cookies from 'js-cookie';

import { UserReducer } from '../typings/store';
import { Action } from '../typings/index';
import retrieveId from '../services/RetrieveId';
import { HSID } from '../constants/global';

import Translations from '../services/Translations';
import Client from '../services/ApolloClient';

const loggedOutState = {
    hsid: '',
    loggedIn: false
};

const hsid = retrieveId();
const initialState: UserReducer = {
    hsid,
    language: 'en',
    loggedIn: false,

    avatar: 'http://lorempixel.com/200/200/people/',
    name: 'Username',
    profession: 'Profession'
};

// actions
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE';

// reducer
export default (state: UserReducer = initialState, action: Action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                loggedIn: true
            };
        case LOG_OUT:
            return loggedOutState;

        case SWITCH_LANGUAGE:
            Translations.setLanguage(action.payload.language);
            return {
                ...state,
                language: action.payload.language
            };
            
        default:
            return state;
    }
};

// action creators
export const LogInUser = (auth: string) => {
    Cookies.set(HSID, auth);
    return {
        type: LOG_IN
    };
};

export const LogOutUser = () => {
    Cookies.remove(HSID);
    Client.resetStore();

    return {
        type: LOG_OUT
    };
};

export const SwitchLanguage = (language) => {
    return {
        type: SWITCH_LANGUAGE,
        payload: {
            language
        }
    };
};