import { match } from 'react-router';
import { CollectionMetadata } from '../typings/timbuctoo/schema';

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

const getCurrentCollectionName = (collectionItems: CollectionMetadata[], collection: string) => {
    const fallBack = collectionItems[0];

    if ( !location ) { return fallBack; }
    const currentCollection = collectionItems.find(item => item.title === collection);

    return currentCollection ? currentCollection : fallBack;
};

export { getDataSet, getCollection, getCurrentCollectionName };