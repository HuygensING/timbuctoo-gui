import { gql } from 'react-apollo';

const QUERY_COLLECTION_VALUES = ({ match, queryString = '/all', currentCollection }) => {
    const query = `
        query CollectionValues {
            dataSets {
                ${match.params.dataSet} {
                    ${currentCollection.collectionListId.replace(match.params.dataSet, '')} {
                        facets {
                            caption
                            options {
                                name
                                count
                            }    
                        }
                        items {
                            uri
                            ${currentCollection.summaryProperties.title} { value }
                            ${currentCollection.summaryProperties.description} { value }
                            ${currentCollection.summaryProperties.image} { value }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_COLLECTION_VALUES;