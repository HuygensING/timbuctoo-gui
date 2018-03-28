import gql from 'graphql-tag';
import { collectionPropertiesReference, CollectionPropertiesReference } from '../fragments/Metadata';
import { componentsFragment, ComponentsFragment } from '../fragments/Components';
import { checkTypes, Query } from '../../typings/schema';
import { RouteComponentProps } from 'react-router';

export type Props = RouteComponentProps<{ dataSet: string; collection: string }>;

export const QUERY_ENTRY_PROPERTIES = ({ match }: Props) => {
    const query = `
        query EntryProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                collectionList {
                    items {
                        itemType
                        collectionId
                    }
                }
                collection(collectionId: "${match.params.collection}") {
                    title { value }
                    collectionId
                    itemType
                    ...CollectionPropertiesReference
                    viewConfig {
                        ...ComponentsFragment
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
    itemType: string;
    viewConfig: ComponentsFragment;
}

checkTypes<QueryMetadata, Query>();
export interface QueryMetadata {
    dataSetMetadata?: {
        collectionList: {
            items: Array<{
                itemType: string;
                collectionId: string;
            }>;
        };
        collection?: CollectionMetadataLocal;
    };
}
