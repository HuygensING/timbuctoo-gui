import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import Client from './services/ApolloClient';
import { configureStore } from './store';
import globalStyling from './theme/globalStyling';
import ScrollToTop from './components/ScrollToTop';

export const store = configureStore();

// set global body styling in the head
globalStyling();

const Application = (
    <ApolloProvider client={Client} store={store}>
        <ScrollToTop />
        <App />
    </ApolloProvider>
);

ReactDOM.render(Application, document.getElementById('root') as HTMLElement);