import { COMPONENTS } from './global';

const EMPTY_VIEW_COMPONENTS = {
    [COMPONENTS.title]: {
        type: COMPONENTS.title,
        value: {
            fields: [{value: '', referenceType: null}]
        }
    },
    [COMPONENTS.value]: {
        type: COMPONENTS.value,
        value: {
            fields: [{value: '', referenceType: null}]
        }
    },
    [COMPONENTS.image]: {
        type: COMPONENTS.image,
        url: {
            fields: [{value: '', referenceType: null}]
        },
        alt: {
            fields: [{value: '', referenceType: null}]
        }
    },
    [COMPONENTS.link]: {
        type: COMPONENTS.link,
        value: {
            fields: [{value: '', referenceType: null}]
        },
        url: {
            fields: [{value: '', referenceType: null}]
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
                    fields: [{value: '', referenceType: null}]
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