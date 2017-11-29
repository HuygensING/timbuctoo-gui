import { combineReducers } from 'redux';
import user, { UserReducer } from './user';
import search, { SearchReducer } from './search';
import viewconfig, { ViewConfigReducer } from './viewconfig';
import facetconfig, { FacetConfigReducer, GraphToFacetConfigAction } from './facetconfig';
import Client from '../services/ApolloClient';

export type GraphToStateAction = GraphToFacetConfigAction;

export const graphToState = (action: GraphToFacetConfigAction['type'], payload: any): GraphToStateAction => ({
    type: action,
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
