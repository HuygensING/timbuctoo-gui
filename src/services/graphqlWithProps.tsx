import graphql from 'react-apollo/graphql';
import React from 'react';
import { CompositeComponent } from 'react-apollo/types';
import { has, get, set } from 'lodash';

interface UpdateOptions {
    queryName: string;
    path: string;
    mutationName: string;
}

const updateQueryOptions = (options?: UpdateOptions) => {
    if (!options) {
        return {};
    }

    const { queryName, path, mutationName } = options; // TODO: update this so the mutation does not complain about heuristic fragment matching
    return {
        options: {
            updateQueries: {
                [queryName]: (cache: any, { mutationResult: { data } }: any) => {
                    const mutation = get(data, mutationName);
                    if (!has(cache, path) || !mutation) {
                        return cache;
                    }
                    return set(cache, path, mutation);
                }
            }
        }
    };
};

/**
 * a HOC that allows for the building of dynamic queries.
 * Pass it a function that returns a query and it will invoke it with the wrapped component's props,
 * creating a graphql component with the returned query
 */
function graphqlWithProps<T>(query: (props: T) => any, updateOptions?: UpdateOptions) {
    return (WrappedComponent: CompositeComponent<T>) => (props: T): JSX.Element => {
        const ComponentWithQuery = graphql(query(props), updateQueryOptions(updateOptions))(WrappedComponent);
        return <ComponentWithQuery {...props} />;
    };
}

export default graphqlWithProps;
