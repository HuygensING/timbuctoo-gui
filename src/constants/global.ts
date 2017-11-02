import { SUB_ROUTES } from './routeNaming';
import { ButtonVariant } from '../typings/layout';
import { MenuItemProp } from '../typings';
import { ComponentFieldType, ComponentTypes } from '../typings/viewComponents';
import User from '../components/icons/User';
import Heart from '../components/icons/Heart';
import Book from '../components/icons/Book';
import GitBranch from '../components/icons/GitBranch';

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

export const BUTTON_VARIANT: {[name: string]: ButtonVariant} = {
    normal: 'normal',
    inverted: 'inverted',
    dark: 'dark',
    disabled: 'disabled'
};

export const MENU_ITEMS: MenuItemProp[] = [
    {
        path: '',
        name: 'Account',
        icon: User
    },
    {
        path: SUB_ROUTES.favorites,
        name: 'Favorites',
        icon: Heart
    },
    {
        path: SUB_ROUTES.dataSets,
        name: 'My datasets',
        icon: Book
    },
    {
        path: SUB_ROUTES.pullRequests,
        name: 'Pull requests',
        icon: GitBranch
    }
];
