import React from 'react';
import { graphql } from 'react-apollo';

/** Connect graphql queries to the desired component. This passes all values from the calls into the props of the component.
 *
 * @param {Function} query
 * @param {Function} mutation
 */
const connectQuery = (query: Function, mutation?: Function) => (ComponentToWrap: any) => {
    return function (props: any) {
        const renderedQuery = query(props);
        const Wrapped = mutation && typeof mutation === 'function'
            ? graphql(mutation(props))(graphql(renderedQuery)(ComponentToWrap))
            : graphql(renderedQuery)(ComponentToWrap);

        return <Wrapped {...props}/>;
    };
};

export default connectQuery;