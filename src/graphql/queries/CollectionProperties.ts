import { gql } from 'react-apollo';
import {
    collectionBase,
    collectionIndexConfig,
    collectionPropertiesDensity,
    collectionSummaryProperties
} from '../fragments/Metadata';

const QUERY_COLLECTION_PROPERTIES = ({ match }) => {
    const query = `
        query CollectionProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                dataSetId
                collection(collectionId: "${match.params.collection}") {
                    ...CollectionBase
                    ...CollectionPropertiesDensity
                    ...CollectionSummaryProperties
                    ...CollectionIndexConfig
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

    return gql`${query}${collectionBase}${collectionPropertiesDensity}${collectionSummaryProperties}${
        collectionIndexConfig
    }`;
};

export default QUERY_COLLECTION_PROPERTIES;
