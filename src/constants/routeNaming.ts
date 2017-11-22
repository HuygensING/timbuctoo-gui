import { KeyValueObject } from '../typings';

const ROUTE_PATHS: KeyValueObject = {
    root: '/',
    search: '/search',
    details: '/details',
    account: '/account',
    edit: '/edit'
};

const SUB_ROUTES = {
    dataSet: '/dataset',
    collection: '/collection',
    entry: '/entry',
    favorites: '/favorites',
    dataSets: '/datasets',
    pullRequests: '/pull-requests',
    meta: '/meta',
    head: '/head',
    colophon: '/colophon',
    partners: '/partners',
    properties: '/properties',
    facets: '/facets',
    viewConfig: '/view-config',
    facetConfig: '/facet-config',
    editScreen: '/edit-screen',
    records: '/records'
};

const ROUTE_KEYS = {
    dataSet: 'dataSet',
    entry: 'entry',
    collection: 'collection',
    sheet: 'sheet',
    cursor: 'cursor'
};

export { ROUTE_PATHS, SUB_ROUTES, ROUTE_KEYS };
