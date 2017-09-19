import React from 'react';
import { graphql, gql } from 'react-apollo';
import { dataSetMetaDataFragment } from '../fragments';
import { INTROSPECTION, QUERY } from '../constants/global';
import { decode } from './UrlStringCreator';

interface Params {
    dataSet: string;
    collection?: string;
    entry?: string;
}

interface Props {
    match: {
      params: Params;
    };
    queryString?: string;

}

type QueryType = 'query' | 'introspection';

const createQueryBody = ({collection, entry}: Params, queryString: string = '/all'): string => {
    if (entry) {
        return `
            __typename
        `;
    } else if (collection) {
        const collectionString = decode(collection);
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
            ${collectionString}(query: ${queryString}) {
                items {
                    
                }
            }
        `;
    }

    return ` 
        metadata {
            ...DataSetMetaDataFragment                       
        }`;
};

const createQuery = (type: QueryType, props: Props): string => {
    const { match, queryString } = props;

    if (type === 'query') {
        return `
            query {
                dataSets {
                    ${match.params.dataSet} {
                        ${createQueryBody(match.params, queryString)}
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
    // TODO: maybe casting the props of component is nicer than "any"
    return function (props: any) {
        const queryString = createQuery(queryType, props);
        const query = gql`${queryString}${dataSetMetaDataFragment}`;
        const Wrapped = graphql(query)(ComponentToWrap);
        return <Wrapped {...props}/>;
    };
};

const connectQuery = buildDynamicQuery(QUERY);
const connectIntrospection = buildDynamicQuery(INTROSPECTION);

export {connectQuery, connectIntrospection};