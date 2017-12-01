import { SUB_ROUTES } from './routeNaming';
import { ButtonVariant } from '../typings/layout';
import { MenuItemProp } from '../typings';
import { ComponentTypes } from '../typings/viewComponents';
import User from '../components/icons/User';
import Heart from '../components/icons/Heart';
import Book from '../components/icons/Book';
import GitBranch from '../components/icons/GitBranch';
import { FacetConfig } from '../typings/schema';

export const HSID: string = 'hsid';

export const CONTAINER_PADDING = 1.5;

export const RDF_TYPE: string = 'rdf_type';
export const VALUE: string = 'value';
export const ITEMS: string = 'items';
export const URI: string = 'uri';

export const DRAGGABLE_COMPONENTS = {
    accordeon: 'accordeon'
};

export const UNKNOWN_VOCABULARY = 'vocabulary_unknown';

export const LEAF_COMPONENTS: ComponentTypes = {
    literal: 'LITERAL',
    path: 'PATH'
};

export const NODE_COMPONENTS: ComponentTypes = {
    title: 'TITLE',
    image: 'IMAGE',
    link: 'LINK',
    keyValue: 'KEYVALUE',
    divider: 'DIVIDER'
};

export const COMPONENTS: ComponentTypes = {
    ...LEAF_COMPONENTS,
    ...NODE_COMPONENTS
};

export const BUTTON_VARIANT: { [name: string]: ButtonVariant } = {
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

export const EMPTY_FACET_CONFIG: FacetConfig = {
    type: 'MultiSelect',
    paths: [] as string[],
    caption: 'new multiselect'
};
