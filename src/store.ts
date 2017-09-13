import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers/rootReducer';
import Client from './services/ApolloClient';

/**
 * Initialize the redux store and configure hot reloading of reducers.
 * This function should be called only once.
 * @returns {object} Store
 */
export function configureStore () {
    return createStore(
        reducers,
        compose(
            applyMiddleware(Client.middleware()),
            (typeof (<any> window).__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? (<any> window).__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        )
    );
}