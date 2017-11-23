import graphql from 'react-apollo/graphql';
import React from 'react';

/**
 * a HOC that allows for the building of dynamic queries.
 * Pass it a function that returns a query and it will invoke it with the wrapped component's props,
 * creating a graphql component with the returned query
 */
function graphqlWithProps<T> (query: (props: T) => any) {
    return (WrappedComponent) => (props: T): JSX.Element => {
        const ComponentWithQuery = graphql(query(props))(WrappedComponent);
        return <ComponentWithQuery {...props} />;
    };
}

export default graphqlWithProps;