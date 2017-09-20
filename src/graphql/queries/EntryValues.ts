import { gql } from 'react-apollo';

const QUERY_ENTRY_VALUES = ({ match, currentCollection, values }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                   ${currentCollection.collectionId}(uri: ${match.entry}) {
                        items {
                            ${values.map((value: String) => value)}
                        }
                    }
                }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_ENTRY_VALUES;