import { gql } from 'react-apollo';

const QUERY_COLLECTION_EDIT_VIEW = ({ match }) => {
    const { collection, dataSet } = match.params;
    console.log( dataSet, collection );
    const query = `
        query QUERY_COLLECTION_EDIT_VIEW {
            dataSetMetadata(dataSetId:"${dataSet}") {
                collectionList {
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