import { gql } from 'react-apollo';
import { createQueryFromValue } from '../../services/getValue';
import setCollectionArguments from '../../services/CollectionArgumentsCreator';

const QUERY_COLLECTION_VALUES = ({ match, location, metadata }) => {
    const { properties, summaryProperties, collectionListId, indexConfig } = metadata.dataSetMetadata.collection;

    const collectionArguments = setCollectionArguments(indexConfig, location);
    const { title, description, image } = summaryProperties;

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
                            ${createQueryFromValue(title, properties)}
                            ${createQueryFromValue(description, properties)}
                            ${createQueryFromValue(image, properties)}
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_COLLECTION_VALUES;