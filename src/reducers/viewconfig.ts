import { ComponentConfig } from '../typings/schema';
import { arrayMove } from 'react-sortable-hoc';
import { NormalizedComponentConfig } from '../typings/index';
import { LEAF_COMPONENTS } from '../constants/global';
import { createReferencePath } from '../services/walkPath';

export type ViewConfigReducer = NormalizedComponentConfig[];

const initialState: ViewConfigReducer = [];

// action definitions

type AddViewConfigNodeAction = {
    type: 'ADD_VIEW_CONFIG_NODE';
    payload: {
        component: ComponentConfig;
        collectionId: string;
    };
};

type ModifyViewConfigNodeAction = {
    type: 'MODIFY_VIEW_CONFIG_NODE';
    payload: {
        nodeId: number;
        component: NormalizedComponentConfig;
    };
};

type SwitchViewConfigNodeAction = {
    type: 'SWITCH_VIEW_CONFIG_NODE';
    payload: {
        nodeId: number;
        collectionId: string;
        component: NormalizedComponentConfig;
    };
};

type ViewConfigChildAction = {
    type: 'ADD_VIEW_CONFIG_CHILD' | 'DELETE_VIEW_CONFIG_CHILD';
    payload: {
        nodeId: number;
        childId: number;
    };
};

type SortViewConfigChildAction = {
    type: 'SORT_VIEW_CONFIG_CHILD';
    payload: {
        nodeId: number;
        oldIndex: number;
        newIndex: number;
    };
};

type DeleteViewConfigItemAction = {
    type: 'DELETE_VIEW_CONFIG_NODE';
    payload: {
        nodeId: number;
    };
};

type SetTreeAction = {
    type: 'SET_VIEW_CONFIG_TREE';
    payload: {
        components: ComponentConfig[];
        collectionId: string;
    };
};

type Action =
    | AddViewConfigNodeAction
    | DeleteViewConfigItemAction
    | ViewConfigChildAction
    | ModifyViewConfigNodeAction
    | SwitchViewConfigNodeAction
    | SortViewConfigChildAction
    | SetTreeAction;

// selectors

export const createName = (typename: string, idx: number, field?: string): string =>
    `${idx}_${typename}${field ? '_' + field : ''}`;

const normalizeTree = (tree: ComponentConfig[], collectionId: string, startIndex: number = -1): ViewConfigReducer => {
    // Flatten a tree of Components into an array of NormalizedComponents with a root branch (index 0)

    let idx = startIndex;
    let flatTree: NormalizedComponentConfig[] = [];

    const normalizeBranch = (branch: ComponentConfig) => {
        idx++;

        let children: number[] = [];
        let id = idx;

        if (branch.subComponents && branch.subComponents.length > 0) {
            for (const subBranch of branch.subComponents) {
                children.push(idx + 1);
                normalizeBranch(subBranch);
            }
        }

        const normalizedComponent: NormalizedComponentConfig = {
            ...branch,
            id,
            childIds: children,
            name: createName(branch.type, id)
        };

        if (branch.type === LEAF_COMPONENTS.path && typeof branch.value === 'string') {
            normalizedComponent.referencePath = createReferencePath(branch.value, collectionId);
        }

        if (branch.subComponents) {
            delete normalizedComponent.subComponents;
        }

        flatTree = [...flatTree, normalizedComponent];
    };

    normalizeBranch({
        type: 'KEYVALUE',
        formatter: [],
        subComponents: tree
    });

    return flatTree;
};

export const getNodeById = (id: number, state: ViewConfigReducer): NormalizedComponentConfig | undefined =>
    state.find(item => item.id === id);

export const lastId = (state: ViewConfigReducer): number =>
    state
        .map(item => item.id)
        .reduce((previousValue: number, currentValue: number) => Math.max(previousValue, currentValue), -1);

const getAllDescendantIds = (state: ViewConfigReducer, nodeId: number) =>
    getNodeById(nodeId, state)!.childIds.reduce(
        (acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)],
        []
    );

const deleteMany = (state: ViewConfigReducer, ids: number[]): ViewConfigReducer => {
    state = [...state];
    for (const id of ids) {
        const index = state.findIndex(item => item.id === id);
        state.splice(index, 1);
    }
    return state;
};

export const denormalizeComponent = (item: NormalizedComponentConfig): ComponentConfig => {
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

const node = (
    state: NormalizedComponentConfig | ComponentConfig | null,
    action: Action,
    items: NormalizedComponentConfig[],
    childNodes: NormalizedComponentConfig[] = []
): NormalizedComponentConfig => {
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
                id: (state as NormalizedComponentConfig).id,
                childIds: (state as NormalizedComponentConfig).childIds,
                name: createName(action.payload.component.type, (state as NormalizedComponentConfig).id)
            };
        case 'SWITCH_VIEW_CONFIG_NODE': {
            const newNode = { ...action.payload.component } as ComponentConfig;
            delete newNode.subComponents;

            return {
                ...normalizeTree([newNode], action.payload.collectionId)[0],
                id: (state as NormalizedComponentConfig).id,
                childIds: childNodes.map(childNode => childNode.id)
            };
        }
        case 'ADD_VIEW_CONFIG_CHILD':
        case 'DELETE_VIEW_CONFIG_CHILD':
        case 'SORT_VIEW_CONFIG_CHILD':
            return {
                ...(state as NormalizedComponentConfig),
                childIds: childIds((state as NormalizedComponentConfig).childIds, action)
            };
        default:
            return state as NormalizedComponentConfig; // todo don't unwrap optional???
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

        case 'SWITCH_VIEW_CONFIG_NODE': {
            const { nodeId, component, collectionId } = action.payload;

            const newChildNodes = normalizeTree(component.subComponents || [], collectionId, lastId(state));
            newChildNodes.pop();
            const nodeIndex = state.findIndex(item => item.id === nodeId);

            const nextNode = node(state[nodeIndex], action, state, newChildNodes);

            const nextState = [...state];
            nextState[nodeIndex] = nextNode;

            return [...nextState, ...newChildNodes];
        }

        case 'ADD_VIEW_CONFIG_NODE': {
            return [...state, ...normalizeTree([action.payload.component], action.payload.collectionId, lastId(state))];
        }
        case 'DELETE_VIEW_CONFIG_NODE': {
            const nodeId = action.payload.nodeId;
            const descendantIds = getAllDescendantIds(state, nodeId);
            return deleteMany(state, [nodeId, ...descendantIds]);
        }
        case 'SET_VIEW_CONFIG_TREE': {
            return normalizeTree(action.payload.components, action.payload.collectionId);
        }
        default:
            return state;
    }
};

export const addViewConfigNode = (component: ComponentConfig, collectionId: string): AddViewConfigNodeAction => ({
    type: 'ADD_VIEW_CONFIG_NODE',
    payload: {
        component,
        collectionId
    }
});

export const modifyViewConfigNode = (
    nodeId: number,
    component: NormalizedComponentConfig
): ModifyViewConfigNodeAction => ({
    type: 'MODIFY_VIEW_CONFIG_NODE',
    payload: {
        nodeId,
        component
    }
});

export const switchViewConfigNode = (
    nodeId: number,
    component: NormalizedComponentConfig,
    collectionId: string
): SwitchViewConfigNodeAction => ({
    type: 'SWITCH_VIEW_CONFIG_NODE',
    payload: {
        nodeId,
        collectionId,
        component
    }
});

export const deleteViewConfigNode = (nodeId: number): DeleteViewConfigItemAction => ({
    type: 'DELETE_VIEW_CONFIG_NODE',
    payload: {
        nodeId
    }
});

export const addViewConfigChild = (nodeId: number, childId: number): ViewConfigChildAction => ({
    type: 'ADD_VIEW_CONFIG_CHILD',
    payload: {
        nodeId,
        childId
    }
});

export const deleteViewConfigChild = (nodeId: number, childId: number): ViewConfigChildAction => ({
    type: 'DELETE_VIEW_CONFIG_CHILD',
    payload: {
        nodeId,
        childId
    }
});

export const sortViewConfigChild = (nodeId: number, oldIndex: number, newIndex: number): SortViewConfigChildAction => ({
    type: 'SORT_VIEW_CONFIG_CHILD',
    payload: {
        nodeId,
        oldIndex,
        newIndex
    }
});

// clears & builds a new tree. This is one way operation (for now)
export const setTree = (components: ComponentConfig[], collectionId: string) => ({
    type: 'SET_VIEW_CONFIG_TREE',
    payload: {
        components,
        collectionId
    }
});
