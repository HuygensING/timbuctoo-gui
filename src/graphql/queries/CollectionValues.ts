import { gql } from 'react-apollo';

const QUERY_COLLECTION_VALUES = ({ match, queryString = '/all', currentCollection }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                   ${currentCollection.collectionListId}(query: "${queryString}") {
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