import { gql } from 'react-apollo';
import { createQueryFromValue } from '../../services/getValue';

const QUERY_COLLECTION_VALUES = ({ match, queryString = '/all', currentCollection }) => {
    const {properties, summaryProperties, collectionListId} = currentCollection;
    const { title, description, image } = summaryProperties;

    const query = `
        query CollectionValues {
        
            dataSets {
                ${match.params.dataSet} {
                    ${collectionListId} {
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