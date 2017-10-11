import { gql } from 'react-apollo';
import { createQueryFromValue } from '../../services/getValue';

const QUERY_COLLECTION_VALUES = ({ match, queryString = '/all', metadata }) => {
    const { properties, summaryProperties, collectionListId } = metadata.dataSetMetadata.collection;
    const { title, description, image } = summaryProperties;

    const query = `
        query CollectionValues {
        
            dataSets {
                ${match.params.dataSet} {
                    ${collectionListId} {
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