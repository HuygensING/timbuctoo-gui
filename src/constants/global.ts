import { ButtonType } from '../typings/layout';

export const HSID: string = 'hsid';

export const COMPONENTS: {[name: string]: string} = {
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