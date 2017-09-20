import { gql } from 'react-apollo';
import { decode } from '../../services/UrlStringCreator';

const QUERY_ENTRY_VALUES = ({ match, currentCollection, values }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                   ${currentCollection.collectionId}(uri: ${decode(match.entry)}) {
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