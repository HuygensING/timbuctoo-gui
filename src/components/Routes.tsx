import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import NotFound from './routes/NotFound';
import { ROUTE_PATHS } from '../constants/routeNaming';
// import { Redirect } from 'react-router';
import { RouteInfo, RouteObject, routes } from '../constants/routeStructure';
import PrivateRoute from './PrivateRoute';

const renderRoutes = () => {
    let routeList: JSX.Element[] = [];

    routes.forEach(
        (routeItem: RouteObject) => {
            const newRoutes = setRoutes(routeItem.key, routeItem.routes, routeItem.isPrivate);
            routeList = routeList.concat(newRoutes);
        }
    );

    return routeList;
};

const setRoutes = (path: string, routeInfo: RouteInfo[], isPrivate?: boolean) => {
    let routeList: JSX.Element[] = [];

    routeInfo.forEach(
        (route: RouteInfo, idx: number) => {
            const subRoute: string = route.path ? route.path : '';

            const routePath: string = path + subRoute;
            const index: string = String(idx);

            // if (route.key) {
            //     routeList.push(
            //         <Route key={'redirect' + path + index} path={routePath} exact={true} >
            //             <Redirect to={ROUTE_PATHS.root} />
            //         </Route>
            //     );
            // }

            const newRoute = isPrivate
                ? <PrivateRoute key={'route' + path + index} path={routePath} component={route.component} />
                : <Route key={'route' + path + index} path={routePath} component={route.component}/>;

            routeList.push(newRoute);
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