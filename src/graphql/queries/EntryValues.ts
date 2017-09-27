import { gql } from 'react-apollo';
import { decode } from '../../services/UrlStringCreator';

const QUERY_ENTRY_VALUES = ({ match, currentCollection, values }) => {
    values = values || [];
    const query = `
        query EntryValues {
            dataSets {
                ${match.params.dataSet} {
                    ${match.params.collection.replace(match.params.dataSet, '')}(uri: "${decode(match.params.entry)}") {
                        __typename # Needs atleast one value to return
                        ${values.map((value: String) => `${value}{value}`)}
                    }
                }
            }
        }
    `;

    return gql`${query}`;
};

export default QUERY_ENTRY_VALUES;