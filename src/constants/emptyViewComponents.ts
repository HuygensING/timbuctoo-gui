import { COMPONENTS } from './global';
import { LeafComponentConfig, NodeComponentConfig } from '../typings/schema';
import { ComponentTypes } from '../typings/viewComponents';

type EmptyLeafComponentsMap = {
    [T in keyof ComponentTypes]: LeafComponentConfig
};

type EmptyViewComponentsMap = {
    [T in keyof ComponentTypes]: NodeComponentConfig
};

export const EMPTY_LEAF_COMPONENT: EmptyLeafComponentsMap = {
    [COMPONENTS.literal]: {
        type: 'LITERAL',
        value: '',
        formatter: [],
        subComponents: []
    },
    [COMPONENTS.path]: {
        type: 'PATH',
        formatter: [],
        subComponents: []
    },
};

// TODO: Create the right initial values for this
export const EMPTY_NODE_COMPONENT: EmptyViewComponentsMap = {
    [COMPONENTS.title]: {
        type: 'TITLE',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.LITERAL] }
        ]
    },
    [COMPONENTS.image]: {
        type: 'IMAGE',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] },
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] }
        ]
    },
    [COMPONENTS.link]: {
        type: 'LINK',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] },
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] }
        ]
    },
    [COMPONENTS.keyValue]: {
        type: 'KEYVALUE',
        formatter: [],
        value: '',
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] }
        ]
    },

    [COMPONENTS.divider]: {
        type: 'DIVIDER',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.LITERAL] }
        ]
    }
};