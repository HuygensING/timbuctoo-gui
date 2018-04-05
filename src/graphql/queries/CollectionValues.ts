import gql from 'graphql-tag';
import setCollectionArguments from '../../services/CollectionArgumentsCreator';
import { RouteComponentProps } from 'react-router';
import { MetaDataProps } from '../../services/metaDataResolver';

export type Props = RouteComponentProps<{ dataSet: string }> & MetaDataProps;

const QUERY_COLLECTION_VALUES = ({ match, location, metadata }: Props) => {
    if (!metadata.dataSetMetadata || !metadata.dataSetMetadata.collection) {
        return null;
    }

    const { collectionListId, indexConfig } = metadata.dataSetMetadata.collection;

    const collectionArguments = setCollectionArguments(indexConfig, location);

    const query = `
        query CollectionValues {
        
            dataSets {
                ${match.params.dataSet} {
                    ${collectionListId}${collectionArguments} {
                        nextCursor
                        prevCursor
                        facets {
                            caption
                            options {
                                name
                                count
                            }
                        }
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
