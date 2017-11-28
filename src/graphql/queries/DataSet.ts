import { gql } from 'react-apollo';
import { dataSetMetadataFragment } from '../fragments/Metadata';
import { RouteComponentProps } from 'react-router';

export type Props = RouteComponentProps<{ dataSet: string; collection: string }>;

const QUERY_DATASET = ({ match }: Props) => {
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
