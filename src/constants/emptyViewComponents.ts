import { COMPONENTS } from './global';
import {
    ComponentConfig, DividerComponentConfig, ImageComponentConfig, KeyvalueComponentConfig, LeafComponentConfig,
    LinkComponentConfig, LiteralComponentConfig,
    NodeComponentConfig, PathComponentConfig,
    TitleComponentConfig
} from '../typings/schema';
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
    } as LiteralComponentConfig,
    [COMPONENTS.path]: {
        type: 'PATH',
        value: '',
        valueList: [],
        formatter: [],
        subComponents: []
    } as PathComponentConfig,
};

// TODO: Create the right initial values for this
export const EMPTY_NODE_COMPONENT: EmptyNodeComponentsMap = {
    [COMPONENTS.title]: {
        type: 'TITLE',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.LITERAL] }
        ]
    } as TitleComponentConfig,
    [COMPONENTS.image]: {
        type: 'IMAGE',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] },
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] }
        ]
    } as ImageComponentConfig,
    [COMPONENTS.link]: {
        type: 'LINK',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] },
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] }
        ]
    } as LinkComponentConfig,
    [COMPONENTS.keyValue]: {
        type: 'KEYVALUE',
        formatter: [],
        value: '',
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.PATH] }
        ]
    } as KeyvalueComponentConfig,

    [COMPONENTS.divider]: {
        type: 'DIVIDER',
        formatter: [],
        subComponents: [
            { ...EMPTY_LEAF_COMPONENT[COMPONENTS.LITERAL] }
        ]
    } as DividerComponentConfig
};

export const EMPTY_COMPONENT: EmptyComponentsMap = {
    ...EMPTY_LEAF_COMPONENT,
    ...EMPTY_NODE_COMPONENT
};