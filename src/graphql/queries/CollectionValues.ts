import { gql } from 'react-apollo';

const QUERY_COLLECTION_VALUES = ({ match, queryString = '/all', currentCollection }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                   ${currentCollection.collectionListId}(query: "${queryString}") {
                        items {
                            ${currentCollection.summaryProperties.title}
                            ${currentCollection.summaryProperties.description}
                            ${currentCollection.summaryProperties.image}
                        }
                    }
                }
            }
        }
    `;

    console.log(query);
    return gql`${query}`;
};

export default QUERY_COLLECTION_VALUES;