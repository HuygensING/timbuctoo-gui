import { COMPONENTS } from './global';
import { ComponentConfig, LeafComponentConfig, NodeComponentConfig } from '../typings/schema';
import { ComponentTypes } from '../typings/viewComponents';

type EmptyComponentsMap = {
    [T in keyof ComponentTypes]: ComponentConfig
};

type EmptyLeafComponentsMap = {
    [T in keyof ComponentTypes]: LeafComponentConfig
};

type EmptyNodeComponentsMap = {
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
        value: '',
        valueList: [],
        formatter: [],
        subComponents: []
    },
};

// TODO: Create the right initial values for this
export const EMPTY_NODE_COMPONENT: EmptyNodeComponentsMap = {
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

export const EMPTY_COMPONENT: EmptyComponentsMap = {
    ...EMPTY_LEAF_COMPONENT,
    ...EMPTY_NODE_COMPONENT
};