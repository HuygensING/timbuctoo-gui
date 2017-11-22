import { compose } from 'redux';
import { mapProps } from 'recompose';
import graphqlWithProps from './graphqlWithProps';
import { match } from 'react-router';
import { DataSetMetadata } from '../typings/schema';
import { QueryProps } from 'react-apollo';

export type MetaDataProps = { 
    metadata: QueryProps & { dataSetMetadata?: DataSetMetadata } 
};

/**
 * Basically a copy of graphqlWithProps. however,
 * returned data gets remapped to the 'metadata' prop.
 */

export default <T> (query: (match: { match: match<any> }) => any) => (
    compose<T>(
        graphqlWithProps(query),
        mapProps(({ data, ...rest }) => ({
            ...rest,
            metadata: data
        }))
    )
);