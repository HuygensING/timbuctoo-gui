import { COMPONENTS } from '../constants/global';
import { Component } from '../typings/schema';
import { arrayMove } from 'react-sortable-hoc';
import { NormalizedComponent } from '../typings/index';

export type ViewConfigReducer = NormalizedComponent[];

const initialState: ViewConfigReducer = [];

// action definitions

type AddViewConfigNodeAction = {
    type: 'ADD_VIEW_CONFIG_NODE',
    payload: {
        component: Component
    }
};

type ModifyViewConfigNodeAction = {
    type: 'MODIFY_VIEW_CONFIG_NODE',
    payload: {
        nodeId: number,
        component: Component
    }
};

type ViewConfigChildAction = {
    type: 'ADD_VIEW_CONFIG_CHILD' | 'DELETE_VIEW_CONFIG_CHILD',
    payload: {
        nodeId: number,
        childId: number
    }
};

type SortViewConfigChildAction = {
    type: 'SORT_VIEW_CONFIG_CHILD',
    payload: {
        nodeId: number,
        oldIndex: number,
        newIndex: number
    }
};

type DeleteViewConfigItemAction = {
    type: 'DELETE_VIEW_CONFIG_NODE',
    payload: {
        nodeId: number
    }
};

type SetTreeAction = {
    type: 'SET_VIEW_CONFIG_TREE',
    payload: {
        components: Component[]
    }
};

type Action =
    AddViewConfigNodeAction
    | DeleteViewConfigItemAction
    | ViewConfigChildAction
    | ModifyViewConfigNodeAction
    | SortViewConfigChildAction
    | SetTreeAction;

// selectors

export const createName = (typename: string, idx: number, field?: string): string => (
    `${idx}_${typename}${field ? '_' + field : ''}`
);

const normalizeTree = (tree: Component[]): ViewConfigReducer => {
    // Flatten a tree of Components into an array of NormalizedComponents with a root branch (index 0)

    let idx = -1;
    let flatTree: NormalizedComponent[] = [];

    const normalizeBranch = (branch: Component) => {
        idx++;

        let children: number[] = [];
        let id = idx;

        if (branch.values) {
            for (const subBranch of branch.values) {
                children.push(idx + 1);
                normalizeBranch(subBranch);
            }
        }

        const normalizedComponent = {
            ...branch,
            id,
            childIds: children,
            name: createName(branch.type, id)
        };
        console.log(normalizedComponent.id, children);
        delete normalizedComponent.values;

        flatTree = [
            ...flatTree,
            normalizedComponent
        ];
    };

    normalizeBranch({
        type: COMPONENTS.keyValue,
        values: tree
    });

    return flatTree;
};

export const getNodeById = (id: number, state: ViewConfigReducer): NormalizedComponent | undefined =>
    state.find(item => item.id === id);

export const lastId = (state: ViewConfigReducer): number => state
    .map(item => item.id)
    .reduce(((previousValue: number, currentValue: number) => Math.max(previousValue, currentValue)), -1);

const getAllDescendantIds = (state: ViewConfigReducer, nodeId: number) => (
    getNodeById(nodeId, state)!.childIds.reduce((acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)], [])
);

const deleteMany = (state: ViewConfigReducer, ids: number[]): ViewConfigReducer => {
    state = [...state];
    for (const id of ids) {
        const index = state.findIndex(item => item.id === id);
        state.splice(index, 1);
    }
    return state;
};

export const denormalizeComponent = (item: NormalizedComponent): Component => {
    item = { ...item };
    delete item.id;
    delete item.childIds;
    delete item.name;
    return item;
};

// reducers

const childIds = (state: number[], action: Action) => {
    switch (action.type) {
        case 'ADD_VIEW_CONFIG_CHILD':
            return [...state, action.payload.childId];
        case 'DELETE_VIEW_CONFIG_CHILD':
            return state.filter(id => id !== action.payload.childId);
        case 'SORT_VIEW_CONFIG_CHILD':
            return arrayMove(state, action.payload.oldIndex, action.payload.newIndex);
        default:
            return state;
    }
};

const node = (state: NormalizedComponent | null, action: Action, items: NormalizedComponent[]): NormalizedComponent => {
    switch (action.type) {
        case 'ADD_VIEW_CONFIG_NODE': {
            const id = lastId(items) + 1;
            return {
                ...action.payload.component,
                id,
                childIds: [],
                name: createName(action.payload.component.type, id)
            };
        }
        case 'MODIFY_VIEW_CONFIG_NODE':
            return {
                ...action.payload.component,
                id: state!.id,
                childIds: state!.childIds,
                name: createName(action.payload.component.type, state!.id)
            };
        case 'ADD_VIEW_CONFIG_CHILD':
        case 'DELETE_VIEW_CONFIG_CHILD':
        case 'SORT_VIEW_CONFIG_CHILD':
            return {
                ...state!,
                childIds: childIds(state!.childIds, action)
            };
        default:
            return state!; // todo don't unwrap optional???
    }
};

export default (state = initialState, action: Action): ViewConfigReducer => {
    switch (action.type) {
        case 'MODIFY_VIEW_CONFIG_NODE':
        case 'SORT_VIEW_CONFIG_CHILD':
        case 'DELETE_VIEW_CONFIG_CHILD':
        case 'ADD_VIEW_CONFIG_CHILD': {
            const nodeId = action.payload.nodeId;
            const nodeIndex = state.findIndex(item => item.id === nodeId);

            const nextNode = node(state[nodeIndex], action, state);
            const nextState = [...state];
            nextState[nodeIndex] = nextNode;
            return nextState;
        }
        case 'ADD_VIEW_CONFIG_NODE': {
            return [...state, node(null, action, state)];
        }
        case 'DELETE_VIEW_CONFIG_NODE': {
            const nodeId = action.payload.nodeId;
            const descendantIds = getAllDescendantIds(state, nodeId);
            return deleteMany(state, [nodeId, ...descendantIds]);
        }
        case 'SET_VIEW_CONFIG_TREE': {
            return normalizeTree(action.payload.components);
        }
        default:
            return state;
    }
};

export const addViewConfigNode = (component: Component): AddViewConfigNodeAction => ({
    type: 'ADD_VIEW_CONFIG_NODE',
    payload: {
        component
    }
});

export const modifyViewConfigNode = (nodeId, component: Component): ModifyViewConfigNodeAction => ({
    type: 'MODIFY_VIEW_CONFIG_NODE',
    payload: {
        nodeId,
        component
    }
});

export const deleteViewConfigNode = (nodeId): DeleteViewConfigItemAction => ({
    type: 'DELETE_VIEW_CONFIG_NODE',
    payload: {
        nodeId
    }
});

export const addViewConfigChild = (nodeId, childId): ViewConfigChildAction => ({
    type: 'ADD_VIEW_CONFIG_CHILD',
    payload: {
        nodeId,
        childId
    }
});

export const deleteViewConfigChild = (nodeId, childId): ViewConfigChildAction => ({
    type: 'DELETE_VIEW_CONFIG_CHILD',
    payload: {
        nodeId,
        childId
    }
});

export const sortViewConfigChild = (nodeId, oldIndex, newIndex): SortViewConfigChildAction => ({
    type: 'SORT_VIEW_CONFIG_CHILD',
    payload: {
        nodeId,
        oldIndex,
        newIndex
    }
});

// clears & builds a new tree. This is one way operation (for now)
export const setTree = (components: Component[]) => ({
    type: 'SET_VIEW_CONFIG_TREE',
    payload: {
        components
    }
});
