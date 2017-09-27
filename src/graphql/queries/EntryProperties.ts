import { gql } from 'react-apollo';
import { componentsFragment } from '../fragments/Components';

const QUERY_ENTRY_PROPERTIES = ({ match, collectionCursor = null }) => {
    const query = `
        query EntryProperties {
            metadata(cursor: "${match.params.dataSet}") {
                collections(cursor: "${collectionCursor ? collectionCursor : match.params.collection}") {
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
    `;

    return gql`${query}${componentsFragment}`;
};

export default QUERY_ENTRY_PROPERTIES;