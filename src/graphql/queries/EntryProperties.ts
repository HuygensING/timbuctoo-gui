import { gql } from 'react-apollo';

const QUERY_ENTRY_PROPERTIES = ({ match }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                    metadata {
                        collections {
                            items {
                                title
                                collectionId
                                # components {
                                #    // TODO: fill with right values   
                                # }
                            }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_ENTRY_PROPERTIES;