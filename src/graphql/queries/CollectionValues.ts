import { gql } from 'react-apollo';
import { createQueryFromValue } from '../../services/getValue';
import queryString from 'querystring';

const QUERY_COLLECTION_VALUES = ({ match, metadata, location }) => {
    const { properties, summaryProperties, collectionListId } = metadata.dataSetMetadata.collection;
    const { title, description, image } = summaryProperties;
    const { cursor } = queryString.parse(location.search.substring(1));
    
    const query = `
        query CollectionValues {
        
            dataSets {
                ${match.params.dataSet} {
                    ${collectionListId}${cursor ? `(cursor: "${cursor}")` : ''} {
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