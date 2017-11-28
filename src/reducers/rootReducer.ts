import { combineReducers } from 'redux';

import user, { UserReducer } from './user';
import search, { SearchReducer } from './search';
import viewconfig, { ViewConfigReducer } from './viewconfig';
import facetconfig, { FacetConfigReducer } from './facetconfig';

import Client from '../services/ApolloClient';

export type GraphToStateAction = {
    type: 'GRAPH_TO_STATE',
    key: string,
    payload: any
};

export const graphToState = (key: string, payload: any): GraphToStateAction => ({
    type: 'GRAPH_TO_STATE',
    key,
    payload
});

export interface RootState {
    user: UserReducer;
    search: SearchReducer;
    viewconfig: ViewConfigReducer;
    facetconfig: FacetConfigReducer;
}

export default combineReducers<RootState>({
    user,
    search,
    viewconfig,
    facetconfig,
    apollo: Client.reducer()
});
