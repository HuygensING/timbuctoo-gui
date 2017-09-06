import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import ApolloClient from './services/ApolloClient';
import { configureStore } from './store';
import globalStyling from './theme/globalStyling';

export const store = configureStore();

// set global body styling in the head
globalStyling();

const Application = (
    <ApolloProvider client={ApolloClient} store={store}>
        <App />
    </ApolloProvider>
);

ReactDOM.render( Application, document.getElementById('root') as HTMLElement );