import { gql } from 'react-apollo';
import { collectionPropertiesReference } from '../fragments/Metadata';
import { componentsFragment } from '../fragments/Components';

const QUERY_ENTRY_PROPERTIES = ({ match, collectionCursor = null }) => {
    const query = `
        query EntryProperties {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                collection(collectionId: "${collectionCursor ? collectionCursor : match.params.collection}") {
                    title { value }
                    collectionId
                    ${!collectionCursor && `
                        ...CollectionPropertiesReference
                    `}
                    components {
                        items {
                            ...ComponentsFragment
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}${componentsFragment}${collectionPropertiesReference}`;
};

export default QUERY_ENTRY_PROPERTIES;