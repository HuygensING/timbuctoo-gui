import { gql } from 'react-apollo';
import { dataSetMetadataFragment } from '../fragments/Metadata';

const QUERY_DATASET = ({ match }) => {
    const query = `
        query DataSet {
            dataSetMetadata(dataSetId: "${match.params.dataSet}") {
                ...DataSetMetadataFragment
            }
        }
    `;

    return gql`${query}${dataSetMetadataFragment}`;
};

export default QUERY_DATASET;