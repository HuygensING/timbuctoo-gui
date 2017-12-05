import { combineReducers } from 'redux';
import user, { UserReducer } from './user';
import search, { SearchReducer } from './search';
import viewconfig, { GraphToViewConfigAction, ViewConfigReducer } from './viewconfig';
import facetconfig, { FacetConfigReducer, GraphToFacetConfigAction } from './facetconfig';
import error, { ErrorReducer } from './error';

export type GraphToStateAction = GraphToFacetConfigAction | GraphToViewConfigAction;

export const graphToState = (actionType: GraphToStateAction['type'], payload: any) => ({
    type: actionType,
    payload
});

export interface RootState {
    user: UserReducer;
    search: SearchReducer;
    viewconfig: ViewConfigReducer;
    facetconfig: FacetConfigReducer;
    error: ErrorReducer;
}

export default combineReducers<RootState>({
    user,
    search,
    viewconfig,
    facetconfig,
    error
});
