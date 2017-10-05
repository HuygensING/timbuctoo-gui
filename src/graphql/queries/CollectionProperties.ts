import { gql } from 'react-apollo';
import { collectionBase, collectionProperties, collectionSummaryProperties } from '../fragments/Metadata';

const QUERY_COLLECTION_PROPERTIES = ({ match }) => {
    const query = `
        query CollectionProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                collection(collectionId: "${match.params.collection}") {
                    ...CollectionBase
                    ...CollectionProperties
                    ...CollectionSummaryProperties
                }
                collectionList {
                    items {
                        ...CollectionBase
                        ...CollectionProperties
                    }
                }
            }
        }
    `;

    return gql`${query}${collectionBase}${collectionProperties}${collectionSummaryProperties}`;
};

export default QUERY_COLLECTION_PROPERTIES;