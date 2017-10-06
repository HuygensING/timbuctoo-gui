import { SUB_ROUTES } from '../constants/routeNaming';
import { ButtonType } from '../typings/layout';
import { MenuItemProp } from '../typings';
import { ComponentFieldType, ComponentTypes } from '../typings/viewComponents';

export const HSID: string = 'hsid';

export const CONTAINER_PADDING = 1.5;

export const DRAGGABLE_COMPONENTS = {
    accordeon: 'accordeon'
};

export const UNKNOWN_VOCABULARY = 'vocabulary_unknown';

export const COMPONENTS: ComponentTypes = {
    title: 'TITLE',
    value: 'VALUE',
    image: 'IMAGE',
    link: 'LINK',
    keyValue: 'KEYVALUE',
    divider: 'DIVIDER',
    tree: 'TREE'
};

export const COMPONENT_FIELDS: ComponentFieldType = {
    valueKey: 'value',
    urlKey: 'url',
    altKey: 'alt',
    key: 'key',
    title: 'title'
};

export const BUTTON_TYPES: {[name: string]: ButtonType} = {
    normal: 'normal',
    inverted: 'inverted',
    dark: 'dark',
    disabled: 'disabled'
};

export const MENU_ITEMS: MenuItemProp[] = [
    {
        path: '',
        name: 'Account',
        icon: 'user'
    },
    {
        path: SUB_ROUTES.favorites,
        name: 'Favorites',
        icon: 'heart'
    },
    {
        path: SUB_ROUTES.dataSets,
        name: 'My datasets',
        icon: 'book'
    },
    {
        path: SUB_ROUTES.pullRequests,
        name: 'Pull requests',
        icon: 'git-branch'
    }
];