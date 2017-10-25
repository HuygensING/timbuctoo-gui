import { COMPONENTS } from '../constants/global';
import { Component } from '../typings/schema';

export type NormalizedComponent = Component & {
    id: number
    childIds: number[]
};

export type ViewConfigReducer = NormalizedComponent[];

/**
 * Flatten a tree of Components into an array of NormalizedComponents with a root branch (index 0)
 */
const normalizeTree = (tree: Component[]): ViewConfigReducer => {
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
            childIds: children
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

const exampleData: Component[] = [
    {
        type: COMPONENTS.title,
        value: {
            fields: []
        }
    },
    {
        type: COMPONENTS.keyValue,
        key: {
            field: 'from'
        },
        values: [
            {
                type: COMPONENTS.keyValue,
                key: {
                    field: 'from'
                },
                values: [
                    {
                        type: COMPONENTS.keyValue,
                        key: {
                            field: 'from'
                        },
                        values: [
                            {
                                type: COMPONENTS.value,
                                value: {
                                    fields: [{
                                        value: 'tim_hasResident',
                                        reference: 'clusius_Persons'
                                    }, {
                                        value: 'tim_gender',
                                    }]
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: COMPONENTS.keyValue,
        key: {
            field: 'to'
        },
        values: [
            {
                type: COMPONENTS.value,
                value: {
                    fields: [{
                        value: 'tim_hasResident',
                        reference: 'clusius_Persons'
                    }, {
                        value: 'tim_hasBirthPlace',
                        reference: 'clusius_Places'
                    }, {
                        value: 'tim_country',
                    }]
                }
            }
        ]
    }
];

const initialState: ViewConfigReducer = normalizeTree(exampleData);

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

type DeleteViewConfigItemAction = {
    type: 'DELETE_VIEW_CONFIG_NODE',
    payload: {
        nodeId: number
    }
};

type Action = AddViewConfigNodeAction | DeleteViewConfigItemAction | ViewConfigChildAction | ModifyViewConfigNodeAction;

export const getNodeById = (id: number, state: ViewConfigReducer): NormalizedComponent | undefined =>
    state.find(item => item.id === id);

const getAllDescendantIds = (state, nodeId) => (
    state[nodeId].childIds.reduce((acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)], [])
);

const deleteMany = (state, ids) => {
    state = { ...state };
    ids.forEach(id => delete state[id]);
    return state;
};

const childIds = (state, action) => {
    switch (action.type) {
        case 'ADD_VIEW_CONFIG_CHILD':
            return [...state, action.childId];
        case 'DELETE_VIEW_CONFIG_CHILD':
            return state.filter(id => id !== action.childId);
        default:
            return state;
    }
};

const node = (state: NormalizedComponent | null, action: Action, items: NormalizedComponent[]): NormalizedComponent => {
    switch (action.type) {
        case 'ADD_VIEW_CONFIG_NODE': {
            const lastId = items
                .map(item => item.id)
                .reduce(((previousValue: number, currentValue: number) => Math.max(previousValue, currentValue)), -Infinity);

            return {
                ...action.payload.component,
                id: lastId + 1,
                childIds: []
            };
        }
        case 'MODIFY_VIEW_CONFIG_NODE':
            return {
                // state can only be null when adding.
                ...state!,
                ...action.payload.component
            };
        case 'ADD_VIEW_CONFIG_CHILD':
        case 'DELETE_VIEW_CONFIG_CHILD':
            return {
                ...state!,
                childIds: state && childIds(state.childIds, action)
            };
        default:
            return state!; // todo don't unwrap optional???
    }
};

export default (state = initialState, action: Action): ViewConfigReducer => {
    switch (action.type) {
        case 'MODIFY_VIEW_CONFIG_NODE':
        case 'DELETE_VIEW_CONFIG_CHILD':
        case 'ADD_VIEW_CONFIG_CHILD': {
            let nodeId = action.payload.nodeId;
            const modifiedNode = node(getNodeById(nodeId, state)!, action, state);
            const nextState = { ...state };
            nextState[nodeId] = modifiedNode;
            return nextState;
        }
        case 'ADD_VIEW_CONFIG_NODE': {
            const modifiedNode = node(null, action, state);
            return [...state, modifiedNode];
        }
        case 'DELETE_VIEW_CONFIG_NODE': {
            let nodeId = action.payload.nodeId;
            const descendantIds = getAllDescendantIds(state, nodeId);
            return deleteMany(state, [nodeId, ...descendantIds]);
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

export const removeChild = (nodeId, childId): ViewConfigChildAction => ({
    type: 'DELETE_VIEW_CONFIG_CHILD',
    payload: {
        nodeId,
        childId
    }
});
