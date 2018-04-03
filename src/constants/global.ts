import { ButtonVariant } from '../typings/layout';
import { MenuItemProp } from '../typings';
import { ComponentTypes } from '../typings/viewComponents';
import Book from '../components/icons/Book';
import { FacetConfig } from '../typings/schema';
import { SUB_ROUTES, ROUTE_PATHS } from './routeNaming';

export const HSID: string = 'hsid';

export const CONTAINER_PADDING: number = 1.5;
export const HEADER_HEIGHT: string = '4rem';

export const HISTORY_REPLACE = 'REPLACE';

export const RDF_TYPE: string = 'rdf_type';
export const VALUE: string = 'value';
export const ITEMS: string = 'items';
export const URI: string = 'uri';

export const MAX_AMOUNT_RANGE_BUCKETS: number = 10;

export const DRAGGABLE_COMPONENTS = {
    accordeon: 'accordeon'
};

export const UNKNOWN_VOCABULARY = 'tim_unknown';

export const LEAF_COMPONENTS: ComponentTypes = {
    literal: 'LITERAL',
    path: 'PATH'
};

export const NODE_COMPONENTS: ComponentTypes = {
    title: 'TITLE',
    image: 'IMAGE',
    link: 'LINK',
    internalLink: 'INTERNAL_LINK',
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
        path: `/${ROUTE_PATHS.account}${SUB_ROUTES.dataSets}`,
        name: 'My datasets',
        icon: Book
    }
];

export const EMPTY_FACET_CONFIG: FacetConfig = {
    type: 'MultiSelect',
    paths: [] as string[],
    caption: 'new multiselect'
};
