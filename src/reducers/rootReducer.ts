import { combineReducers } from 'redux';

import user, { UserReducer } from './user';
import search, { SearchReducer } from './search';
import viewconfig, { ViewConfigReducer } from './viewconfig';

import Client from '../services/ApolloClient';

export interface RootState {
    user: UserReducer;
    search: SearchReducer;
    viewconfig: ViewConfigReducer;
}

export default combineReducers<RootState>({
    user,
    search,
    viewconfig,
    apollo: Client.reducer()
});
