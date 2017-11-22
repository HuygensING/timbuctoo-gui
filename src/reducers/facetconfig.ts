import { FacetConfig } from '../typings/schema';
import { NormalizedFacetConfig } from '../typings/index';
import { arrayMove } from 'react-sortable-hoc';
import { mendPath, splitPath } from '../services/walkPath';

// state def
export type FacetConfigReducer = NormalizedFacetConfig[];
const defaultState: FacetConfigReducer = [];

// actions
type AddFacetConfigItemAction = {
    type: 'ADD_FACET_CONFIG_ITEM',
    payload: {
        facetConfig: FacetConfig,
        collectionId: string
    }
};
type SetFacetConfigItemsAction = {
    type: 'SET_FACET_CONFIG_ITEMS',
    payload: {
        collectionId: string,
        facetConfigs: FacetConfig[]
    }
};

type DeleteFacetConfigItemAction = {
    type: 'DELETE_FACET_CONFIG_ITEM',
    payload: {
        id: number
    }
};

type ModifyFacetConfigItemAction = {
    type: 'MODIFY_FACET_CONFIG_ITEM',
    payload: {
        id: number,
        facetConfig: NormalizedFacetConfig
    }
};

type SortFacetConfigItemAction = {
    type: 'SORT_FACET_CONFIG_ITEM',
    payload: {
        oldIndex: number,
        newIndex: number
    }
};

type Action =
    AddFacetConfigItemAction
    | SetFacetConfigItemsAction
    | DeleteFacetConfigItemAction
    | ModifyFacetConfigItemAction
    | SortFacetConfigItemAction;

// selectors

export const lastId = (state: FacetConfigReducer): number => state
    .map(config => config.id)
    .reduce(((previousValue: number, currentValue: number) => Math.max(previousValue, currentValue)), -1);

export const getById = (id: number, state: FacetConfigReducer): NormalizedFacetConfig | undefined =>
    state.find(config => config.id === id);

export const denormalizeFacetConfig = (config: NormalizedFacetConfig): FacetConfig => {
    config = { ...config };

    for (const [idx, referencePath] of config.referencePaths.entries()) {
        config.paths[idx] = mendPath(referencePath);
    }

    delete config.referencePaths;
    delete config.id;
    return config;
};

export const composeFacets = (facetConfigs: NormalizedFacetConfig[]): FacetConfig[] => (
    facetConfigs.map(denormalizeFacetConfig)
);

// reducer
const references = (payload: { facetConfig: { paths: string[] }, collectionId: string }): (string[])[][] => {
    let referencePaths: (string[])[][] = [];

    for (const path of payload.facetConfig.paths) {
        // initial
        const newReferencePath = [
            [payload.collectionId],
            ...(splitPath(path) as string[][])
        ];
        referencePaths = [ ...referencePaths, newReferencePath ];
    }

    if (!referencePaths.length) {
        referencePaths = [[ [payload.collectionId] ]];
    }

    return referencePaths;
};

const item = (state: NormalizedFacetConfig | null, action: Action, items: NormalizedFacetConfig[]): NormalizedFacetConfig => {
    switch (action.type) {
        case 'ADD_FACET_CONFIG_ITEM':
            return {
                ...action.payload.facetConfig,
                referencePaths: references(action.payload),
                id: lastId(items) + 1,
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

const multipleItems = ({ facetConfigs, collectionId }): NormalizedFacetConfig[] => {
    let items: NormalizedFacetConfig[] = [];

    for (const facetConfig of facetConfigs) {
        items = [
            ...items,
            item(null, { type: 'ADD_FACET_CONFIG_ITEM', payload: { facetConfig, collectionId } }, items)
        ];
    }
    return items;
};

export default (state: FacetConfigReducer = defaultState, action: Action) => {
    switch (action.type) {
        case 'ADD_FACET_CONFIG_ITEM':
            return [...state, item(null, action, state)];
        case 'SET_FACET_CONFIG_ITEMS':
            return multipleItems(action.payload);
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
export const addFacetConfigItem = (facetConfig: FacetConfig, collectionId: string): AddFacetConfigItemAction => ({
    type: 'ADD_FACET_CONFIG_ITEM',
    payload: {
        collectionId,
        facetConfig
    }
});

export const setFacetConfigItems = (facetConfigs: FacetConfig[], collectionId: string): SetFacetConfigItemsAction => ({
    type: 'SET_FACET_CONFIG_ITEMS',
    payload: {
        collectionId,
        facetConfigs
    }
});

export const deleteFacetConfigItem = (id: number): DeleteFacetConfigItemAction => ({
    type: 'DELETE_FACET_CONFIG_ITEM',
    payload: {
        id
    }
});

export const modifyFacetConfig = (id: number, facetConfig: NormalizedFacetConfig): ModifyFacetConfigItemAction => ({
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
