import { gql } from 'react-apollo';
import {
    collectionBase,
    collectionIndexConfig,
    collectionPropertiesDensity,
    collectionSummaryProperties
} from '../fragments/Metadata';
import { RouteComponentProps } from 'react-router';
import { componentsFragment } from '../fragments/Components';

type Props = RouteComponentProps<{ dataSet: string; collection: string }>;

const QUERY_COLLECTION_PROPERTIES = ({ match }: Props) => {
    // TODO: Might be smart to split this up in multiple queries. When all calls are here, let's check
    const query = `
        query CollectionProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                dataSetId
                collection(collectionId: "${match.params.collection}") {
                    uri
                    ...CollectionBase
                    ...CollectionPropertiesDensity
                    ...CollectionSummaryProperties
                    ...CollectionIndexConfig
                    viewConfig {
                        ...ComponentsFragment
                    }
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
    }${componentsFragment}`;
};

export default QUERY_COLLECTION_PROPERTIES;
