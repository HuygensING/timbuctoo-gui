import { combineReducers, Reducer } from 'redux';
import user, { UserReducer } from './user';
import search, { SearchReducer } from './search';
import viewconfig, { GraphToViewConfigAction, ViewConfigReducer } from './viewconfig';
import facetconfig, { FacetConfigReducer, GraphToFacetConfigAction } from './facetconfig';
import error, { ErrorReducer } from './error';
import { routerReducer, RouterState } from 'react-router-redux';

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
    routing: Reducer<RouterState>;
}

export default combineReducers<RootState>({
    user,
    search,
    viewconfig,
    facetconfig,
    error,
    routing: routerReducer
});
