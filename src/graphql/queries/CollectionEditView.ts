import { gql } from 'react-apollo';

const QUERY_COLLECTION_EDIT_VIEW = ({ match, collectionId }) => {
    const { dataSet } = match.params;
    const query = `
        query QUERY_COLLECTION_EDIT_VIEW {
            dataSetMetadata(dataSetId:"${dataSet}") {
                collection(collectionId:"${collectionId}") {
                    properties {
                        items {
                            name
                            isList
                            isValueType
                            referencedCollections { items }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_COLLECTION_EDIT_VIEW;