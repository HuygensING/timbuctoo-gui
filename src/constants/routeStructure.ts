import { ComponentType } from 'react';
import { ROUTE_KEYS, ROUTE_PATHS, SUB_ROUTES } from './routeNaming';
import Search from '../components/routes/Search';
import { RouteComponentProps } from 'react-router';
import DummyRoute from '../components/routes/DummyRoute';
import Entry from '../components/routes/Entry';
import DataSet from '../components/routes/DataSet';

export interface RouteInfo {
    path?: string;
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
                path: `/:${ROUTE_KEYS.dataSet}`,
                component: DummyRoute
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
                path: `/:${ROUTE_KEYS.dataSet}/:${ROUTE_KEYS.collection}/:${ROUTE_KEYS.entry}`,
                component: Entry
            },
            {
                path: `/:${ROUTE_KEYS.dataSet}/:${ROUTE_KEYS.collection}`,
                component: Search
            },
            {
                path: `/:${ROUTE_KEYS.dataSet}`,
                component: DataSet
            }
        ]
    },
    {
        key: ROUTE_PATHS.account,
        isPrivate: true,
        routes: [
            {
                path: SUB_ROUTES.favorites,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.dataSets,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.pullRequests,
                component: DummyRoute
            },
            {
                component: DummyRoute
            }
        ]
    },
    {
        key: `${ROUTE_PATHS.edit}/:${ROUTE_KEYS.dataSet}`,
        routes: [
            {
                path: SUB_ROUTES.meta,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.head,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.colophon,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.partners,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.properties,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.facets,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.viewScreen,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.editScreen,
                component: DummyRoute
            },
            {
                path: SUB_ROUTES.records,
                component: DummyRoute
            }
        ]
    }
];