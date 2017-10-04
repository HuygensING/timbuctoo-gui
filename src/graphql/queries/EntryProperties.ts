import { gql } from 'react-apollo';
import { componentsFragment } from '../fragments/Components';

const QUERY_ENTRY_PROPERTIES = ({ match, collectionCursor = null }) => {
    const query = `
        query EntryProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                collectionList(cursor: "${collectionCursor ? collectionCursor : match.params.collectionList}") {
                    items {
                        title
                        collectionId
                        ${!collectionCursor && `
                            properties {
                                items {
                                    name
                                    referenceTypes { items }
                                    valueTypes { items }
                                }
                            }
                        `}
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