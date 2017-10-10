import { combineReducers } from 'redux';

import user from './user';
import search from './search';

import { State } from '../typings/store';
import Client from '../services/ApolloClient';

const appReducers = combineReducers({
    user,
    search,
    apollo: Client.reducer()
});

export default function rootReducer (state: State, action: {type: any}) {
    return appReducers(state, action);
}
