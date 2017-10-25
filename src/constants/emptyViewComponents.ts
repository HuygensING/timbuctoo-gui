import { COMPONENTS } from './global';
import { Component } from '../typings/schema';
import { ComponentTypes } from '../typings/viewComponents';

type EmptyViewComponentsMap = {
    [T in keyof ComponentTypes]: Component
};

const EMPTY_VIEW_COMPONENTS: EmptyViewComponentsMap = {
    [COMPONENTS.title]: {
        type: COMPONENTS.title,
        value: {
            fields: [{ value: '' }]
        }
    },
    [COMPONENTS.value]: {
        type: COMPONENTS.value,
        value: {
            fields: [{ value: '' }]
        }
    },
    [COMPONENTS.image]: {
        type: COMPONENTS.image,
        url: {
            fields: [{ value: '' }]
        },
        alt: {
            fields: [{ value: '' }]
        }
    },
    [COMPONENTS.link]: {
        type: COMPONENTS.link,
        value: {
            fields: [{ value: '' }]
        },
        url: {
            fields: [{ value: '' }]
        }
    },
    [COMPONENTS.keyValue]: {
        type: COMPONENTS.keyValue,
        key: {
            fields: [{ value: '' }]
        },
        values: [
            {
                type: COMPONENTS.value,
                value: {
                    fields: [{ value: '' }]
                }
            }
        ]
    },

    [COMPONENTS.divider]: {
        type: COMPONENTS.divider,
        title: {
            field: ''
        }
    }
};

export default EMPTY_VIEW_COMPONENTS;
