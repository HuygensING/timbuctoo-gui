import React from 'react';
import { graphql, gql } from 'react-apollo';
import timbuctoo from '../fragments';

export default function buildDynamicQuery(ComponentToWrap: any) {
    return function(props: any) {
        const queryString = `
            query {
                dataSets {
                    ${props.match.params.dataSet} {
                        metadata {
                            ...CommentsPageComment
                               
                        }
                    }
                }
            }
        `;

        const query = gql`${queryString}${timbuctoo.fragments.dataSetMetaData}`;
        const Wrapped = graphql(query)(ComponentToWrap);
        return <Wrapped {...props}/>;
    };
}