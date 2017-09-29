import { COMPONENTS } from './global';

const EMPTY_VIEW_COMPONENTS = {
    [COMPONENTS.title]: {
        __typename: COMPONENTS.title,
         value: {
             isKey: true,
             fields: ['']
         }
    },
    [COMPONENTS.value]: {
        __typename: COMPONENTS.value,
        value: {
            isKey: true,
            fields: ['']
        }
    },
    [COMPONENTS.image]: {
        __typename: COMPONENTS.image,
        url: {
            isKey: true,
            fields: ['']
        },
        alt: {
            isKey: true,
            fields: ['']
        }
    },
    [COMPONENTS.link]: {
        __typename: COMPONENTS.link,
        value: {
            isKey: true,
            fields: ['']
        },
        url: {
            isKey: true,
            fields: ['']
        }
    },
    [COMPONENTS.keyValue]: {
        __typename: COMPONENTS.keyValue,
        key: {
            isKey: false,
            fields: ['']
        },
        values: [
            {
                __typename: COMPONENTS.value,
                value: {
                    isKey: true,
                    fields: ['']
                }
            }
        ]
    },
    [COMPONENTS.divider]: {
        __typename: COMPONENTS.divider,
        value: {
            isKey: true,
            fields: ['']
        }
    }
};

export default EMPTY_VIEW_COMPONENTS;