import { gql } from 'react-apollo';

const QUERY_COLLECTION_EDIT_VIEW = ({ match, collectionId }) => {
    const { collection, dataSet } = match.params;
    const selectedCollectionId = collectionId || collection;
    console.log( selectedCollectionId );
    const query = `
        query QUERY_COLLECTION_EDIT_VIEW {
            dataSetMetadata(dataSetId:"${dataSet}") {
                collection(collectionId:"${selectedCollectionId}") {
                    items {
                        properties {
                            items {
                                name
                                referenceTypes { items }
                                valueTypes { items }
                            }
                        }
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_COLLECTION_EDIT_VIEW;