import { gql } from 'react-apollo';
import { componentsFragment } from '../fragments/Components';

const QUERY_ENTRY_PROPERTIES = ({ match }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                    metadata {
                        collections(cursor: "${match.params.collection}") {
                            items {
                                title
                                collectionId
                                components {
                                    items {
                                        ...ComponentsFragment
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}${componentsFragment}`;
};

export default QUERY_ENTRY_PROPERTIES;