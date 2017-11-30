import { ComponentConfig } from '../typings/schema';
import { arrayMove } from 'react-sortable-hoc';
import { NormalizedComponentConfig } from '../typings/index';
import { LEAF_COMPONENTS } from '../constants/global';
import { createReferencePath, mendPath } from '../services/walkPath';
import { componentErrors } from '../services/Validation';

export type ViewConfigReducer = NormalizedComponentConfig[];

const initialState: ViewConfigReducer = [];

// action definitions

type AddViewConfigNodeAction = {
    type: 'ADD_VIEW_CONFIG_NODE';
    payload: {
        component: ComponentConfig;
        collectionId: string;
        nodeId?: number;
    };
};

type ModifyViewConfigNodeAction = {
    type: 'MODIFY_VIEW_CONFIG_NODE';
    payload: {
        nodeId: number;
        component: NormalizedComponentConfig;
    };
};

type ChangeViewConfigNodeTypeAction = {
    type: 'CHANGE_VIEW_CONFIG_NODE_TYPE';
    payload: {
        nodeId: number;
        collectionId: string;
        component: NormalizedComponentConfig;
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
    | ModifyViewConfigNodeAction
    | ChangeViewConfigNodeTypeAction
    | SortViewConfigChildAction
    | SetTreeAction;

// selectors

export const createName = (typename: string, idx: number, field?: string): string =>
    `${idx}_${typename}${field ? '_' + field : ''}`;

export const getNodeIndex = (id: number, state): number | undefined => state.findIndex(nodeItem => nodeItem.id === id);

export const getNodeById = (id: number, state: ViewConfigReducer): NormalizedComponentConfig | undefined =>
    state.find(item => item.id === id);

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

const denormalizePath = (childNode: NormalizedComponentConfig): NormalizedComponentConfig => {
    childNode = { ...childNode };

    if (childNode.referencePath) {
        childNode.value = mendPath(childNode.referencePath);
        delete childNode.referencePath;
    }

    return childNode;
};

const denormalizeNode = (item: NormalizedComponentConfig, state: ViewConfigReducer): ComponentConfig | string => {
    item = denormalizePath(item);
    item.subComponents = [];

    if (item.childIds && !!item.childIds.length) {
        for (const child of item.childIds) {
            const childNode = getNodeById(child, state);

            if (childNode) {
                const error = componentErrors(childNode);
                if (error) {
                    return error;
                }

                const denormalizedChildNode = denormalizeNode(childNode, state);

                if (denormalizedChildNode && typeof denormalizedChildNode !== 'string') {
                    item.subComponents.push(denormalizedChildNode);
                }
            }
        }
    }

    if (item.__typename) {
        delete item.__typename;
    }

    delete item.id;
    delete item.childIds;
    delete item.name;
    return item;
};

export const denormalizeTree = (state: ViewConfigReducer): ComponentConfig[] | string => {
    let denormalizedTree: ComponentConfig[] = [];

    const parentNode = getNodeById(0, state)!;

    for (const rootNodeIdx of parentNode.childIds) {
        const rootNode = getNodeById(rootNodeIdx, state);
        if (rootNode) {
            const error = componentErrors(rootNode);
            if (error) {
                return error;
            }

            const denormalizedRootNode = denormalizeNode(rootNode, state);

            if (denormalizedRootNode) {
                if (typeof denormalizedRootNode === 'string') {
                    return denormalizedRootNode;
                }

                denormalizedTree.push(denormalizedRootNode);
            }
        }
    }

    return denormalizedTree;
};

export const lastId = (state: ViewConfigReducer): number =>
    state
        .map(item => item.id)
        .reduce((previousValue: number, currentValue: number) => Math.max(previousValue, currentValue), -1);

const getAllDescendantIds = (state: ViewConfigReducer, nodeId: number): number[] => {
    const curNode = getNodeById(nodeId, state);

    if (!curNode) {
        return [] as number[];
    }

    return curNode.childIds.reduce((acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)], []);
};

const deleteAllReferences = (state: ViewConfigReducer, nodeId: number): ViewConfigReducer =>
    state.map(stateNode => {
        for (const [idx, childId] of stateNode.childIds.entries()) {
            if (childId === nodeId) {
                stateNode.childIds.splice(idx, 1);
            }
        }
        return stateNode;
    });

const stateWithoutNodeReferences = (state: ViewConfigReducer, nodeId: number): ViewConfigReducer => {
    const newState = [...state];

    for (const id of [nodeId, ...getAllDescendantIds(state, nodeId)]) {
        const index = getNodeIndex(id, state);

        if (index) {
            newState.splice(index, 1);
        }
    }

    return deleteAllReferences(newState, nodeId);
};

// reducers
const nodesToAdd = (state: ViewConfigReducer, action: Action): NormalizedComponentConfig[] => {
    switch (action.type) {
        case 'ADD_VIEW_CONFIG_NODE': {
            const child = normalizeTree([action.payload.component], action.payload.collectionId, lastId(state));
            child.pop(); // remove normalizing head
            return child;
        }
        case 'CHANGE_VIEW_CONFIG_NODE_TYPE': {
            const children = normalizeTree(
                action.payload.component.subComponents || [],
                action.payload.collectionId,
                lastId(state)
            );
            children.pop();
            return children;
        }
        default:
            return [];
    }
};

const node = (
    state: NormalizedComponentConfig,
    action: Action,
    items: NormalizedComponentConfig[],
    childNodes: NormalizedComponentConfig[] = []
): NormalizedComponentConfig => {
    switch (action.type) {
        case 'ADD_VIEW_CONFIG_NODE': {
            const newId = childNodes.length > 0 ? [childNodes[childNodes.length - 1].id] : [];
            return {
                ...state,
                childIds: [...state.childIds, ...newId]
            };
        }
        case 'MODIFY_VIEW_CONFIG_NODE':
            return {
                ...action.payload.component,
                id: state.id,
                childIds: state.childIds,
                name: createName(action.payload.component.type, state.id)
            };
        case 'SORT_VIEW_CONFIG_CHILD':
            return {
                ...state,
                childIds: arrayMove(state.childIds, action.payload.oldIndex, action.payload.newIndex)
            };
        case 'CHANGE_VIEW_CONFIG_NODE_TYPE': {
            const newNodeList = normalizeTree([action.payload.component], action.payload.collectionId);
            const newNode = newNodeList[newNodeList.length - 2];
            return {
                ...newNode,
                id: state.id,
                childIds: childNodes.map(childNode => childNode.id),
                name: createName(action.payload.component.type, state.id)
            };
        }
        default:
            return state; // todo don't unwrap optional???
    }
};

export default (state = initialState, action: Action): ViewConfigReducer => {
    switch (action.type) {
        case 'MODIFY_VIEW_CONFIG_NODE':
        case 'SORT_VIEW_CONFIG_CHILD':
        case 'ADD_VIEW_CONFIG_NODE':
        case 'CHANGE_VIEW_CONFIG_NODE_TYPE': {
            const newNodes = nodesToAdd(state, action);
            const nodeIndex = getNodeIndex(action.payload.nodeId!, state);
            const nextNode = node(state[nodeIndex!], action, state, newNodes);

            const nextState = [...state];
            nextState[nodeIndex!] = nextNode;

            return [...nextState, ...newNodes];
        }
        case 'DELETE_VIEW_CONFIG_NODE': {
            const { nodeId } = action.payload;
            return stateWithoutNodeReferences(state, nodeId);
        }
        case 'SET_VIEW_CONFIG_TREE': {
            return normalizeTree(action.payload.components, action.payload.collectionId);
        }
        default:
            return state;
    }
};

export const addViewConfigNode = (
    component: ComponentConfig,
    collectionId: string,
    nodeId?: number
): AddViewConfigNodeAction => ({
    type: 'ADD_VIEW_CONFIG_NODE',
    payload: {
        component,
        collectionId,
        nodeId
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

export const changeViewConfigNodeType = (
    nodeId: number,
    component: NormalizedComponentConfig,
    collectionId: string
): ChangeViewConfigNodeTypeAction => ({
    type: 'CHANGE_VIEW_CONFIG_NODE_TYPE',
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
