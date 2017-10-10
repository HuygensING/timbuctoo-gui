import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { GRAPH_URI } from '../constants/api';
import { store } from '../index';
import { State } from '../typings/store';
import { NextFunction } from 'express';

const networkInterface = createNetworkInterface({
    uri: GRAPH_URI,
    opts: {
        headers: {
            Accept: 'application/json'
        }
    }
});

networkInterface.use([{
    applyMiddleware(req: any, next: NextFunction) {
        if (!req.options.headers) {
            req.options.headers = {};
        }

        // get the authentication token from state if available
        const state: State | any = store.getState();
        req.options.headers.authorization = state && state.user && state.user.hsid ? state.user.hsid : null;
        next();
    }
}]);

const Client = new ApolloClient({
    networkInterface
});
export default Client;