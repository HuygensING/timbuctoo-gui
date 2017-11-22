import { COMPONENTS } from './global';
import { ComponentType } from '../typings/schema';

export const SELECT_COMPONENT_TYPES: { key: string, value: ComponentType }[] = [
    {
        key: 'Title',
        value: COMPONENTS.title
    },
    {
        key: 'Path',
        value: COMPONENTS.path
    },
    {
        key: 'Literal',
        value: COMPONENTS.literal
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