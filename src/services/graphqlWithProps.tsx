import graphql from 'react-apollo/graphql';
import React from 'react';

/**
 * a HOC that allows for the building of dynamic queries.
 * Pass it a function that returns a query and it will invoke it with the wrapped component's props,
 * creating a graphql component with the returned query
 */
export default (query) => (WrappedComponent) => (props) => {
    const ComponentWithQuery = graphql(query(props))(WrappedComponent);
    return <ComponentWithQuery {...props} />;
};