import { match } from 'react-router';
import { CollectionMetadata } from '../typings/timbuctoo/schema';


// TODO: Rename this file!
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
    console.log(dataSet);
    console.log(collectionId);

    if (!dataSet || !collectionId) { return noContent; }

    // TODO remove replacing this stuff
    const id = collectionId.replace(props.match.params.dataSet, '');
    return dataSet[id];
};

const getCurrentCollection = (collectionItems: CollectionMetadata[], collection: string) => {
    const fallBack = collectionItems[0];

    if ( !collection ) { return fallBack; }
    const currentCollection = collectionItems.find(item => item.collectionListId === collection);

    return currentCollection ? currentCollection : fallBack;
};

export { getDataSet, getCollection, getCurrentCollection };