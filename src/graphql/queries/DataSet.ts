import { gql } from 'react-apollo';
import { dataSetMetadataFragment } from '../fragments/Metadata';

const QUERY_DATASET = ({ match }) => {
    const query = `
        query {
            dataSets {
                ${match.params.dataSet} {
                    metadata {
                       ...DataSetMetadataFragment
                    }
                }
            }
        }
    `;

    return gql`${query}${dataSetMetadataFragment}`;
};

export default QUERY_DATASET;