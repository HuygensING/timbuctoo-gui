import gql from 'graphql-tag';
import { collectionBase, collectionPropertiesDensity } from '../fragments/Metadata';
import { RouteComponentProps } from 'react-router';
import { componentsFragment } from '../fragments/Components';

export type Props = RouteComponentProps<{ dataSet: string; collection: string }>;

const QUERY_COLLECTION_PROPERTIES = ({ match }: Props) => {
    // TODO: Might be smart to split this up in multiple queries. When all calls are here, let's check

    // TODO: Removed index support
    //  indexConfig {
    //                         ...CollectionIndexConfig
    //                     }
    const query = `
        query CollectionProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                dataSetId
                collection(collectionId: "${match.params.collection}") {
                    uri
                    ...CollectionBase
                    ...CollectionPropertiesDensity
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

    // TODO: removed index support: collectionIndexConfig
    return gql`${query}${collectionBase}${collectionPropertiesDensity}${componentsFragment}`;
};

export default QUERY_COLLECTION_PROPERTIES;
