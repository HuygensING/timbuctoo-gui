import { gql } from 'react-apollo';
import { collectionPropertiesReference, CollectionPropertiesReference } from '../fragments/Metadata';
import { componentsFragment, ComponentsFragment } from '../fragments/Components';
import { checkTypes, Query } from '../../typings/schema';
import { RouteComponentProps } from 'react-router';

export type Props = RouteComponentProps<{dataSet: string, collection: string}>;

export const QUERY_ENTRY_PROPERTIES = ({ match }: Props) => {
    const query = `
        query EntryProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                collectionList {
                    items {
                        itemType
                        collectionId
                        summaryProperties {
                            title { value }
                        }
                    }
                }
                collection(collectionId: "${match.params.collection}") {
                    title { value }
                    collectionId
                    ...CollectionPropertiesReference
                    viewConfig {
                        ...ComponentsFragment
                    }
                    summaryProperties {
                        title { value }
                        description { value }
                        image { value }
                    }
                }
            }
        }
    `;

    return gql`${query}${componentsFragment}${collectionPropertiesReference}`;
};

interface CollectionMetadataLocal extends CollectionPropertiesReference {
    title?: { value: string };
    collectionId: string;
    viewConfig: ComponentsFragment;
    summaryProperties: {
        title?: { value: string }
        description?: { value: string }
        image?: { value: string }
    };
}

checkTypes<QueryMetadata, Query>();
export interface QueryMetadata {
    dataSetMetadata?: {
        collectionList: {
            items: Array<{
                itemType: string
                collectionId: string;
                summaryProperties: {
                    title?: { value: string }
                }
            }>;
        };
        collection?: CollectionMetadataLocal;
    };
}