import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import NotFound from './routes/NotFound';

const Router = () => (
    <Switch>
        <Route path={'*'} component={Home}/>
        <Route component={NotFound} />
    </Switch>
);

export default Router;