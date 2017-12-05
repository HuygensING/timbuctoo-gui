import { collectionPropertiesReference } from '../fragments/Metadata';
import gql from 'graphql-tag';
import { RouteComponentProps } from 'react-router';

export interface Props {
    collectionIds: string[];
}

type FullProps = Props & RouteComponentProps<{ dataSet: string }>;

const QUERY_COLLECTION_EDIT_VIEW = ({ match, collectionIds }: FullProps) => {
    const { dataSet } = match.params;

    let query = '';

    for (const collectionId of collectionIds) {
        query += `
        query QUERY_COLLECTION_EDIT_VIEW_${collectionId} {
            dataSetMetadata(dataSetId:"${dataSet}") {
                collection(collectionId:"${collectionId}") {
                    ...CollectionPropertiesReference
                }
            }
        }
        `;
    }

    return gql`${query}${collectionPropertiesReference}`;
};

export default QUERY_COLLECTION_EDIT_VIEW;
