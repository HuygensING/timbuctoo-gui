import { RouteComponentProps } from 'react-router';

interface Props {
    data: any;
}

type FullProps = Props & RouteComponentProps<any>;

const GetDataSet = (props: FullProps) => {
    const { dataSet } = props.match.params;
    const { dataSets } = props.data;

    if (!dataSet || !dataSets) { return null; }

    return dataSets[dataSet];
};

export default GetDataSet;