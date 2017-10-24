import { COMPONENTS } from '../constants/global';
import { Component, ComponentValueField } from '../typings/schema';

export type NormalizedComponent = Component & {
    id: number
    childIds: number[]
};

export interface ViewConfigReducer {
    items: NormalizedComponent[];
}

/**
 * Flatten a tree of Components into an array of NormalizedComponents
 * @param tree
 * @returns {NormalizedComponent[]}
 */
const normalizeTree = (tree: Component[]): NormalizedComponent[] => {
    let idx = -1;
    let flatTree: NormalizedComponent[] = [];
    const normalizeBranch = (branch: Component) => {
        idx++;

        const normalizedComponent = {
            ...branch,
            id: idx,
            childIds: branch.values ? branch.values.map((x, childIdx) => (
                idx + (childIdx + 1)
            )) : [],
        };
        delete normalizedComponent.values;

        flatTree = [
            ...flatTree,
            normalizedComponent
        ];

        if (branch.values) {
            branch.values.forEach(normalizeBranch);
        }
    };

    tree.forEach(normalizeBranch);

    return flatTree;
};

const emptyFields: ComponentValueField[] = [];
const exampleData: Component[] = [
    {
        type: COMPONENTS.title,
        value: {
            fields: emptyFields
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

const initialState: ViewConfigReducer = {
    items: normalizeTree(exampleData)
};

console.log(initialState.items);

export default (state = initialState, action: any) => {
    return state;
};
