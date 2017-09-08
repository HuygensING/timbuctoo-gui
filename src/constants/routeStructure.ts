import { ComponentType } from 'react';
import { ROUTE_KEYS, ROUTE_PATHS, SUB_ROUTES } from './routeNaming';
import Search from '../components/routes/Search';
import NotFound from '../components/routes/NotFound';
import { RouteComponentProps } from 'react-router';

export interface RouteInfo {
    path?: string;
    key?: string;
    component: ComponentType<RouteComponentProps<any> | {}>;
}

export interface RouteObject {
    key: string;
    routes: RouteInfo[];
    isPrivate?: boolean;

}

export const routes: RouteObject[] = [
    {
        key: ROUTE_PATHS.search,
        routes: [
            {
                path: SUB_ROUTES.dataSet,
                key: ROUTE_KEYS.dataSet,
                component: Search
            },
            {
                path: ROUTE_KEYS.dataSet + SUB_ROUTES.collection,
                key: ROUTE_KEYS.collection,
                component: Search
            },
            {
                component: Search
            }
        ]
    },
    {
        key: ROUTE_PATHS.details,
        routes: [
            {
                path: SUB_ROUTES.dataSet,
                key: ROUTE_KEYS.dataSet,
                component: NotFound
            },
            {
                path: SUB_ROUTES.entry,
                key: ROUTE_KEYS.entry,
                component: NotFound
            },
            {
                component: NotFound
            }
        ]
    },
    {
        key: ROUTE_PATHS.account,
        isPrivate: true,
        routes: [
            {
                path: SUB_ROUTES.favorites,
                component: NotFound
            },
            {
                path: SUB_ROUTES.dataSets,
                component: NotFound
            },
            {
                path: SUB_ROUTES.pullRequests,
                component: NotFound
            },
            {
                component: NotFound
            }
        ]
    },
    {
        key: `${ROUTE_PATHS.edit}/:${ROUTE_KEYS.dataSet}`,
        routes: [
            {
                path: SUB_ROUTES.meta,
                component: NotFound
            },
            {
                path: SUB_ROUTES.head,
                component: NotFound
            },
            {
                path: SUB_ROUTES.colophon,
                component: NotFound
            },
            {
                path: SUB_ROUTES.partners,
                component: NotFound
            },
            {
                path: SUB_ROUTES.properties,
                component: NotFound
            },
            {
                path: SUB_ROUTES.facets,
                component: NotFound
            },
            {
                path: SUB_ROUTES.viewScreen,
                component: NotFound
            },
            {
                path: SUB_ROUTES.editScreen,
                component: NotFound
            },
            {
                path: SUB_ROUTES.records,
                component: NotFound
            }
        ]
    }
];