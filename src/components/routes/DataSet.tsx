import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { CollectionMetadata, DataSets } from '../../typings/timbuctoo/schema';
import { getDataSet } from '../../services/GetDataSet';
import DataSetBody from '../dataSet/DataSetBody';
import QUERY_DATASET from '../../graphql/queries/DataSet';
import connectQuery from '../../services/ConnectQuery';
import Loading from '../Loading';

interface Props {}

interface ApolloProps {
    data: {
        dataSets: DataSets;
    };
}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;
interface State {}

class DataSet extends Component<FullProps, State> {
    static getCurrentCollectionName (collectionItems: CollectionMetadata[], collection: string) {
        const fallBack = collectionItems[0];

        if ( !location ) { return fallBack; }
        const currentCollection = collectionItems.find(item => item.title === collection);

        return currentCollection ? currentCollection : fallBack;
    }

    render () {
        const dataSet = getDataSet(this.props);
        if ( !dataSet ) { return <Loading />; }

        console.log(dataSet);

        const { datasetId, title, description, imageUrl, collections } = dataSet.metadata;

        const collectionItems: CollectionMetadata[] = collections && collections.items
            ? collections.items
            : [];

        return (
            <DataSetBody
                title={title}
                description={description}
                imageUrl={imageUrl}
                datasetId={datasetId}
                collectionKeys={collectionItems}
                match={this.props.match}
            />
        );
    }
}

export default connectQuery(QUERY_DATASET)(DataSet);