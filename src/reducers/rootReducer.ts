import { combineReducers } from 'redux';

import user, { UserReducer, Action as UserAction } from './user';
import search, { SearchReducer } from './search';

import Client from '../services/ApolloClient';

export interface RootState {
    user: UserReducer;
    search: SearchReducer;
}

export type RootAction = UserAction;

export default combineReducers<RootState>({
    user,
    search,
    apollo: Client.reducer()
});