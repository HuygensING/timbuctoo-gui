import { gql } from 'react-apollo';

const QUERY_COLLECTION_PROPERTIES = ({ match }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                   metadata {
                        collections {
                            items {
                                title
                                collectionListId
                                summaryProperties {
                                    title
                                    description
                                    image
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_COLLECTION_PROPERTIES;