import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import NotFound from './routes/NotFound';
import { ROUTE_PATHS } from '../constants/routeNaming';
import { Redirect } from 'react-router';
import { RouteInfo, RouteObject, routes } from '../constants/routeStructure';

const renderRoutes = () => {
    let routeList: JSX.Element[] = [];

    routes.forEach(
        (routeItem: RouteObject) => {
            const newRoutes = setRoutes(routeItem.key, routeItem.routes);
            routeList = routeList.concat(newRoutes);
        }
    );

    return routeList;
};

const setRoutes = (path: string, routeInfo: RouteInfo[]) => {
    let routeList: JSX.Element[] = [];

    routeInfo.forEach(
        (route: RouteInfo, idx: number) => {
            const subRoute: string = route.path ? route.path : '';
            const key: string = route.key ? `/:${route.key}` : '';

            const routePath: string = path + subRoute;
            const index: string = String(idx);

            if (route.key) {
                routeList.push(
                    <Route key={'redirect' + path + index} path={routePath} exact={true} >
                        <Redirect to={ROUTE_PATHS.root} />
                    </Route>
                );
            }

            routeList.push(<Route key={'route' + path + index} path={routePath + key} component={route.component}/>);
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
            <Route component={NotFound} />
        </Switch>
    );
};

export default Router;