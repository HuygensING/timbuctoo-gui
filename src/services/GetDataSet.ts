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

const getCollection = (props: Props, collectionId) =>  {
    const dataSet = getDataSet(props);

    if (!dataSet || !collectionId) { return noContent; }

    return dataSet[collectionId];
};

export { getDataSet, getCollection };