import React from 'react';
import { graphql } from 'react-apollo';

const connectQuery = (query: Function) => (ComponentToWrap: any) => {
    return function (props: any) {
        const renderedQuery = query(props);
        const Wrapped = graphql(renderedQuery)(ComponentToWrap);
        return <Wrapped {...props}/>;
    };
};

export default connectQuery;