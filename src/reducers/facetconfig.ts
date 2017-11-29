import { FacetConfig } from '../typings/schema';
import { NormalizedFacetConfig } from '../typings/index';
import { arrayMove } from 'react-sortable-hoc';

// state def
export type FacetConfigReducer = NormalizedFacetConfig[];
const defaultState: FacetConfigReducer = [];

// actions
type AddFacetConfigItemAction = {
    type: 'ADD_FACET_CONFIG_ITEM';
    payload: {
        facetConfig: FacetConfig;
    };
};
type SetFacetConfigItemsAction = {
    type: 'SET_FACET_CONFIG_ITEMS';
    payload: {
        facetConfigs: FacetConfig[];
    };
};

type DeleteFacetConfigItemAction = {
    type: 'DELETE_FACET_CONFIG_ITEM';
    payload: {
        id: number;
    };
};

type ModifyFacetConfigItemAction = {
    type: 'MODIFY_FACET_CONFIG_ITEM';
    payload: {
        id: number;
        facetConfig: FacetConfig;
    };
};

type SortFacetConfigItemAction = {
    type: 'SORT_FACET_CONFIG_ITEM';
    payload: {
        oldIndex: number;
        newIndex: number;
    };
};

type Action =
    | AddFacetConfigItemAction
    | SetFacetConfigItemsAction
    | DeleteFacetConfigItemAction
    | ModifyFacetConfigItemAction
    | SortFacetConfigItemAction;

// selectors

export const lastId = (state: FacetConfigReducer): number =>
    state
        .map(config => config.id)
        .reduce((previousValue: number, currentValue: number) => Math.max(previousValue, currentValue), -1);

export const getById = (id: number, state: FacetConfigReducer): NormalizedFacetConfig | undefined => state.find(config => config.id === id);

// reducer

const item = (
    state: NormalizedFacetConfig | null,
    action: Action,
    items: NormalizedFacetConfig[]
): NormalizedFacetConfig => {
    switch (action.type) {
        case 'ADD_FACET_CONFIG_ITEM':
            return {
                ...action.payload.facetConfig,
                id: lastId(items) + 1
            };
        case 'MODIFY_FACET_CONFIG_ITEM':
            return {
                ...action.payload.facetConfig,
                id: state!.id
            };
        default:
            return state!;
    }
};

const multipleItems = (action: Action): NormalizedFacetConfig[] => {
    if (action.type !== 'SET_FACET_CONFIG_ITEMS') {
        return [];
    }

    let items: NormalizedFacetConfig[] = [];
    for (const facetConfig of action.payload.facetConfigs) {
        items = [...items, item(null, { type: 'ADD_FACET_CONFIG_ITEM', payload: { facetConfig } }, items)];
    }
    return items;
};

export default (state: FacetConfigReducer = defaultState, action: Action) => {
    switch (action.type) {
        case 'ADD_FACET_CONFIG_ITEM':
            return [...state, item(null, action, state)];
        case 'SET_FACET_CONFIG_ITEMS':
            return [...multipleItems(action)];
        case 'MODIFY_FACET_CONFIG_ITEM': {
            const index = state.findIndex(config => config.id === action.payload.id);
            const nextState = [...state];
            nextState[index] = item(state[index], action, state);
            return nextState;
        }
        case 'SORT_FACET_CONFIG_ITEM':
            return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);
        default:
            return state;
    }
};

// action creators
export const addFacetConfigItem = (facetConfig: FacetConfig): AddFacetConfigItemAction => ({
    type: 'ADD_FACET_CONFIG_ITEM',
    payload: {
        facetConfig
    }
});

export const setFacetConfigItems = (facetConfigs: FacetConfig[]): SetFacetConfigItemsAction => ({
    type: 'SET_FACET_CONFIG_ITEMS',
    payload: {
        facetConfigs
    }
});

export const deleteFacetConfigItem = (id: number): DeleteFacetConfigItemAction => ({
    type: 'DELETE_FACET_CONFIG_ITEM',
    payload: {
        id
    }
});

export const modifyFacetConfig = (id: number, facetConfig: FacetConfig): ModifyFacetConfigItemAction => ({
    type: 'MODIFY_FACET_CONFIG_ITEM',
    payload: {
        id,
        facetConfig
    }
});

export const sortFacetConfigItem = (oldIndex: number, newIndex: number): SortFacetConfigItemAction => ({
    type: 'SORT_FACET_CONFIG_ITEM',
    payload: {
        oldIndex,
        newIndex
    }
});
