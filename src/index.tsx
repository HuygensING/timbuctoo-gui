import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import Client from './services/ApolloClient';
import { configureStore } from './store';
import globalStyling from './theme/globalStyling';

export const store = configureStore();

// set global body styling in the head
globalStyling();

const renderApp = () =>
    ReactDOM.render(
        <ApolloProvider client={Client} store={store}>
            <App />
        </ApolloProvider>,
        document.getElementById('root') as HTMLElement
    );

if (module.hot) {
    module.hot.accept('./components/App', () => {
        renderApp();
    });
}

renderApp();
