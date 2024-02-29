import gql from 'graphql-tag';
import setCollectionArguments from '../../services/CollectionArgumentsCreator';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';

export type Props = RouteComponentProps<{ dataSet: string }> & MetaDataProps;

const QUERY_COLLECTION_VALUES = ({ match, location, metadata }: Props) => {
    if (!metadata.dataSetMetadata || !metadata.dataSetMetadata.collection) {
        return null;
    }

    // TODO: Removed facet support: indexConfig
    const { collectionListId } = metadata.dataSetMetadata.collection;
    const collectionArguments = setCollectionArguments({ facet: [], fullText: [] }, location);

    // TODO: Removed facet support
    //  facets {
    //                             caption
    //                             options {
    //                                 name
    //                                 count
    //                             }
    //                         }

    const query = `
        query CollectionValues {
            dataSets {
                ${match.params.dataSet} {
                    ${collectionListId}${collectionArguments} {
                        nextCursor
                        prevCursor
                        items {
                            uri
                            title { value type }
                            description { value type }
                            image { value type }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_COLLECTION_VALUES;
