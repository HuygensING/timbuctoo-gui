import React from 'react';
import { graphql, gql } from 'react-apollo';
import { collectionsFragment, dataSetMetaDataFragment } from '../fragments';
import { INTROSPECTION, QUERY } from '../constants/global';

interface Params {
    dataSet: string;
    collection?: string;
    entry?: string;
}

type QueryType = 'query' | 'introspection';

const createQueryBody = ({collection, entry}: Params): string => {
    if (entry) {
        return `
            __typename
        `;
    } else if (collection) {
        return `
            metadata {
                collections {
                    ...CollectionsFragment
                    views {
                        items {
                            id
                            type
                        }
                    }
                }
            }
        `;
    }

    return ` 
        metadata {
            ...DataSetMetaDataFragment                       
        }`;
};

const createQuery = (type: QueryType, params: Params): string => {
    if (type === 'query') {
        return `
            query {
                dataSets {
                    ${params.dataSet} {
                        ${createQueryBody(params)}
                    }
                }
            }
        `;
    } else {
        return `
            __type(name: ) {
                
            }
        `;
    }
};

const buildDynamicQuery = (queryType: QueryType) => (ComponentToWrap: any) => {
    return function (props: any) {
        const queryString = createQuery(queryType, props.match.params);
        console.log(queryString);
        const query = gql`${queryString}${dataSetMetaDataFragment}${collectionsFragment}`;
        const Wrapped = graphql(query)(ComponentToWrap);
        return <Wrapped {...props}/>;
    };
};

const connectQuery = buildDynamicQuery(QUERY);
const connectIntrospection = buildDynamicQuery(INTROSPECTION);

export {connectQuery, connectIntrospection};

