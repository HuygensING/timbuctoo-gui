import { gql } from 'react-apollo';
import { collectionBase, collectionPropertiesDensity, collectionSummaryProperties } from '../fragments/Metadata';

const QUERY_COLLECTION_PROPERTIES = ({ match }) => {
    const query = `
        query CollectionProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                collection(collectionId: "${match.params.collection}") {
                    ...CollectionBase
                    ...CollectionPropertiesDensity
                    ...CollectionSummaryProperties
                }
                collectionList {
                    items {
                        ...CollectionBase
                        ...CollectionPropertiesDensity
                    }
                }
            }
        }
    `;

    return gql`${query}${collectionBase}${collectionPropertiesDensity}${collectionSummaryProperties}`;
};

export default QUERY_COLLECTION_PROPERTIES;