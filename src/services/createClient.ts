import { ApolloClient } from 'apollo-client';
import { GRAPH_URI } from '../constants/api';
import { RootState } from '../reducers/rootReducer';
import { Store } from 'redux';
import { Errors, setError } from '../reducers/error';
import { ErrorResponse, onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { print } from 'graphql';

const createClient = (store: Store<RootState>) => {
    const links: ApolloLink[] = [
        onError(({ graphQLErrors, networkError, operation }: ErrorResponse) => {
            graphQLErrors = graphQLErrors || [];
            const errors: Errors = networkError ? [...graphQLErrors, networkError] : graphQLErrors;
            const query = '# operation = ' + operation.operationName + '\n\n' + print(operation.query);
            store.dispatch(setError(errors, query, operation.variables, networkError ? 0 : 500));
        }),
        setContext(() => {
            const state: RootState = store.getState();
            return {
                headers: {
                    authorization: (state && state.user && state.user.hsid) || null
                }
            };
        }),
        new HttpLink({
            uri: GRAPH_URI,
            headers: {
                accept: 'application/json'
            }
        })
    ];

    return new ApolloClient({
        link: links.reduce((a: ApolloLink, b: ApolloLink) => a.concat(b)),

        // TODO: replace with a redux cache, once it exists
        // https://github.com/apollographql/apollo-client/issues/2509#issuecomment-343963114
        cache: new InMemoryCache()
    });
};

export default createClient;
