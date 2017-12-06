import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import App from './components/App';
import { configureStore } from './store';
import globalStyling from './theme/globalStyling';
import createClient from './services/createClient';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
export const store = configureStore(history);
export const client = createClient(store);

// set global body styling in the head
globalStyling();

const renderApp = () =>
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </ApolloProvider>,
        document.getElementById('root')
    );

if (module.hot) {
    module.hot.accept('./components/App', () => {
        renderApp();
    });
}

renderApp();
