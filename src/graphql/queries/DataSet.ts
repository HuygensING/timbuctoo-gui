import { gql } from 'react-apollo';
import { dataSetMetadataFragment } from '../fragments/Metadata';
import { match as RouterMatch } from 'react-router';

const QUERY_DATASET = ({ match }: { match: RouterMatch<any>}) => {
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