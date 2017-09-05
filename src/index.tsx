import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import './index.css';
import ApolloClient from './services/ApolloClient';
import { configureStore } from './store';

const store = configureStore();

const Application = (
    <ApolloProvider client={ApolloClient} store={store}>
        <App />
    </ApolloProvider>
);

ReactDOM.render( Application, document.getElementById('root') as HTMLElement );