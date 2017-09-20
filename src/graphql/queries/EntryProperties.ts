import { gql } from 'react-apollo';
import { valuesFragment } from '../fragments/Components';

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
                                components {
                                    items {
                                        ..valuesFragment
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}${valuesFragment}`;
};

export default QUERY_ENTRY_PROPERTIES;