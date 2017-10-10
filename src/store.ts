import { applyMiddleware, compose, createStore, Store } from 'redux';
import reducers, { RootState } from './reducers/rootReducer';
import Client from './services/ApolloClient';

declare var window: {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
};

const composeEnhancers = (
    process.env.NODE_ENV === 'development' &&
    window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

/**
 * Initialize the redux store and configure hot reloading of reducers.
 * This function should be called only once.
 * @returns {object} Store
 */
export function configureStore(initialState?: RootState): Store<RootState> {
    return createStore<RootState>(
        reducers,
        initialState!,
        composeEnhancers(
            applyMiddleware(Client.middleware()),
        )
    );
}