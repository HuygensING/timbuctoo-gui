import { COMPONENT_FIELDS, COMPONENTS } from './global';
import { ComponentType } from '../typings/schema';

export const FIELD_TITLES = {
    [COMPONENT_FIELDS.valueKey]: 'value',
    [COMPONENT_FIELDS.altKey]: 'alt text',
    [COMPONENT_FIELDS.key]: 'key',
    [COMPONENT_FIELDS.urlKey]: 'url',
};

export const SELECT_COMPONENT_TYPES: { key: string, value: ComponentType }[] = [
    {
        key: 'Title',
        value: COMPONENTS.title
    },
    {
        key: 'Value',
        value: COMPONENTS.value
    },
    {
        key: 'Image',
        value: COMPONENTS.image
    },
    {
        key: 'Link',
        value: COMPONENTS.link
    },
    {
        key: 'Key-Value',
        value: COMPONENTS.keyValue
    },
    {
        key: 'Divider',
        value: COMPONENTS.divider
    }
];