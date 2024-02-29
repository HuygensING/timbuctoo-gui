import Cookies from 'js-cookie';
import retrieveId from '../services/RetrieveId';
import { SESSION_TOKEN } from '../constants/global';
import { client } from '../index';

export interface UserReducer {
    sessionToken: Readonly<string>;
    language: Readonly<'en' | 'nl'>;
    loggedIn: Readonly<boolean>;
    avatar: Readonly<string>;
    name: Readonly<string>;
    profession: Readonly<string>;
}

const loggedOutState = {
    sessionToken: '',
    loggedIn: false
};

const sessionToken = retrieveId();
const initialState: UserReducer = {
    sessionToken,
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
    Cookies.set(SESSION_TOKEN, auth);
    return {
        type: 'LOG_IN'
    };
};

export const LogOutUser = (): LogoutAction => {
    Cookies.remove(SESSION_TOKEN);
    client.resetStore();

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
