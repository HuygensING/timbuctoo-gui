import { COMPONENTS } from './global';

const EMPTY_VIEW_COMPONENTS = {
    [COMPONENTS.title]: {
        type: COMPONENTS.title,
         value: {
             fields: ['']
         }
    },
    [COMPONENTS.value]: {
        type: COMPONENTS.value,
        value: {
            fields: ['']
        }
    },
    [COMPONENTS.image]: {
        type: COMPONENTS.image,
        url: {
            fields: ['']
        },
        alt: {
            fields: ['']
        }
    },
    [COMPONENTS.link]: {
        type: COMPONENTS.link,
        value: {
            fields: ['']
        },
        url: {
            fields: ['']
        }
    },
    [COMPONENTS.keyValue]: {
        type: COMPONENTS.keyValue,
        key: {
            fields: ''
        },
        values: [
            {
                type: COMPONENTS.value,
                value: {
                    fields: ['']
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