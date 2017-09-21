import { ButtonType } from '../typings/layout';

export const HSID: string = 'hsid';
export const QUERY = 'query';
export const INTROSPECTION = 'introspection';

export const COMPONENTS = {
    value: 'ValueComponent',
    image: 'ImageComponent',
    link: 'LinkComponent',
    keyValue: 'KeyValueComponent',
    table: 'TableComponent',
    divider: 'DividerComponent'
};

export const BUTTON_TYPES: {[name: string]: ButtonType} = {
    normal: 'normal',
    inverted: 'inverted',
    dark: 'dark'
};