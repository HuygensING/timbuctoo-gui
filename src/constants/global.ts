import { ButtonType } from '../typings/layout';

export const HSID: string = 'hsid';

export const CONTAINER_PADDING = 1.5;

interface ComponentTypes {
    title: string;
    value: string;
    image: string;
    link: string;
    keyValue: string;
    table: string;
    divider: string;
}

interface ComponentFieldType {
    valueKey: string;
    urlKey: string;
    altKey: string;
    key: string;
}

export const COMPONENTS: ComponentTypes = {
    title: 'TitleComponent',
    value: 'ValueComponent',
    image: 'ImageComponent',
    link: 'LinkComponent',
    keyValue: 'KeyValueComponent',
    table: 'TableComponent',
    divider: 'DividerComponent'
};

export const COMPONENT_FIELDS: ComponentFieldType = {
    valueKey: 'value',
    urlKey: 'url',
    altKey: 'alt',
    key: 'key'
};

export const BUTTON_TYPES: {[name: string]: ButtonType} = {
    normal: 'normal',
    inverted: 'inverted',
    dark: 'dark'
};