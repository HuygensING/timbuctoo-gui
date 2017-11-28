import { collectionPropertiesReference } from '../fragments/Metadata';
import { gql } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

export interface Props {
    collectionId: string;
}

type FullProps = Props & RouteComponentProps<{ dataSet: string }>;

const QUERY_COLLECTION_EDIT_VIEW = ({ match, collectionId }: FullProps) => {
    const { dataSet } = match.params;
    const query = `
        query QUERY_COLLECTION_EDIT_VIEW {
            dataSetMetadata(dataSetId:"${dataSet}") {
                collection(collectionId:"${collectionId}") {
                    ...CollectionPropertiesReference
                }
            }
        }
    `;

    return gql`${query}${collectionPropertiesReference}`;
};

export default QUERY_COLLECTION_EDIT_VIEW;
