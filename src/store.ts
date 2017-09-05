import { createStore } from 'redux';
import reducers from './reducers/rootReducer';

/**
 * Initialize the redux store and configure hot reloading of reducers.
 * This function should be called only once.
 * @returns {object} Store
 */
export function configureStore () {
    return createStore(
        reducers,
        (<any> window).__REDUX_DEVTOOLS_EXTENSION__ && (<any> window).__REDUX_DEVTOOLS_EXTENSION__()
    );
}
