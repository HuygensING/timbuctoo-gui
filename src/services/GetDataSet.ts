import { match } from 'react-router';

interface Props {
    data: any;
    match: match<any>;
}

const noContent = null;

const getDataSet = (props: Props) => {
    const { dataSet } = props.match.params;
    const { dataSets } = props.data;

    if (!dataSet || !dataSets) { return noContent; }

    return dataSets[dataSet];
};

const getCollection = (props: Props) =>  {
    const dataSet = getDataSet(props);
    const { collection } = props.match.params;

    if (!dataSet || !collection) { return noContent; }

    return dataSet[collection];
};

export { getDataSet, getCollection };