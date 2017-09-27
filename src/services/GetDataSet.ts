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

const getCollection = (props: Props, collectionId: string) =>  {
    const dataSet = getDataSet(props);

    if (!dataSet || !collectionId) { return noContent; }

    return dataSet[collectionId];
};

const getCurrentCollection = (collectionItems: CollectionMetadata[], collection: string) => {
    const fallBack = collectionItems[0];

    if ( !collection ) { return fallBack; }
    const currentCollection = collectionItems.find(item => item.collectionListId === collection);

    return currentCollection ? currentCollection : fallBack;
};

export { getDataSet, getCollection, getCurrentCollection };