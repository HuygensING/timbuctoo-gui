import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import NotFound from './routes/NotFound';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { RouteInfo, RouteObject, routes } from '../constants/routeStructure';
import ApolloRoute from './ApolloRoute';
import PrivateRoute from './PrivateRoute';

const renderRoutes = (): JSX.Element[] => {
    let routeList: JSX.Element[] = [];

    routes.forEach(
        (routeItem: RouteObject) => {
            const newRoutes = setRoutes(routeItem);
            routeList = routeList.concat(newRoutes);
        }
    );

    return routeList;
};

const setRoutes = (routeItem: RouteObject): JSX.Element[] => {
    let routeList: JSX.Element[] = [];

    routeItem.routes.forEach(
        (route: RouteInfo, idx: number) => {
            const subRoute: string = route.path ? route.path : '';
            const routePath: string = routeItem.key + subRoute;
            const key: string = `route_${routePath}_${idx}`;

            if (route.queryMetadata) {
                const ApolloRouteComponent = ApolloRoute(route.component);
                routeList.push(
                    <Route key={key} path={routePath}>
                        <ApolloRouteComponent route={route} routePath={routePath} isPrivate={routeItem.isPrivate} />
                    </Route>
                );
            } else {
                const newRoute = routeItem.isPrivate
                    ? <PrivateRoute key={key} path={routePath} component={route.component} />
                    : <Route key={key} path={routePath} component={route.component}/>;

                routeList.push(newRoute);
            }
        }
    );

    return routeList;
};

const renderedRoutes = renderRoutes();

const Router = () => {

    return (
        <Switch>
            <Route path={ROUTE_PATHS.root} exact={true} component={Home}/>
            {renderedRoutes}
            <Route component={NotFound}/>
        </Switch>
    );
};

export default Router;