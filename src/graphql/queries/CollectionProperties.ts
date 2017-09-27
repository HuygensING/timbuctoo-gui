import { gql } from 'react-apollo';
import { collectionsFragment } from '../fragments/Metadata';

const QUERY_COLLECTION_PROPERTIES = ({ match }) => {
    const query = `
        query CollectionProperties {
            metadata(cursor: "${match.params.dataSet}") {
                ...CollectionsFragment
            }
        }
    `;

    return gql`${query}${collectionsFragment}`;
};

export default QUERY_COLLECTION_PROPERTIES;