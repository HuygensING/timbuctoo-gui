import { gql } from 'react-apollo';

const QUERY_DATASET = ({ match }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                    metadata {
                        datasetId
                        title
                        description
                        imageUrl
                        owner {
                            name
                            email
                        }
                        contact {
                            name
                            email
                        }
                        provenanceInfo {
                            title
                            body
                        }
                        collections {
                            items {
                                title 
                                collectionId
                            }
                        }                
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_DATASET;