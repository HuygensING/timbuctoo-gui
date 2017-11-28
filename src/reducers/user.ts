import Cookies from 'js-cookie';
import retrieveId from '../services/RetrieveId';
import { HSID } from '../constants/global';
import Client from '../services/ApolloClient';

export interface UserReducer {
    hsid: Readonly<string>;
    language: Readonly<string>;
    loggedIn: Readonly<boolean>;
    avatar: Readonly<string>;
    name: Readonly<string>;
    profession: Readonly<string>;
}

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
interface LoginAction {
    type: 'LOG_IN';
}
interface LogoutAction {
    type: 'LOG_OUT';
}
interface SwitchLanguageAction {
    type: 'SWITCH_LANGUAGE';
    payload: {
        language: string;
    };
}
export type Action = LoginAction | LogoutAction | SwitchLanguageAction;

// reducer
export default (state: UserReducer = initialState, action: Action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                loggedIn: true
            };
        case 'LOG_OUT':
            return loggedOutState;

        case 'SWITCH_LANGUAGE':
            return {
                ...state,
                language: action.payload.language
            };

        default:
            return state;
    }
};

// action creators
export const LogInUser = (auth: string): LoginAction => {
    Cookies.set(HSID, auth);
    return {
        type: 'LOG_IN'
    };
};

export const LogOutUser = (): LogoutAction => {
    Cookies.remove(HSID);
    Client.resetStore();

    return {
        type: 'LOG_OUT'
    };
};

export const SwitchLanguage = (language: string): SwitchLanguageAction => {
    return {
        type: 'SWITCH_LANGUAGE',
        payload: {
            language
        }
    };
};
