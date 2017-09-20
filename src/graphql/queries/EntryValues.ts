import { gql } from 'react-apollo';
import { decode } from '../../services/UrlStringCreator';

const QUERY_ENTRY_VALUES = ({ match, currentCollection, values }) => {
    values = values || [];
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                    ${match.params.collection}(uri: "${decode(match.params.entry)}") {
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