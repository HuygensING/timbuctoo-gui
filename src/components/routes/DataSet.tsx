import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CollectionMetadata, DataSets } from '../../typings/timbuctoo/schema';
import GetDataSet from '../../services/GetDataSet';
import DataSetBody from '../DataSet/DataSetBody';
import QUERY_DATASET from '../../graphql/queries/DataSet';
import connectQuery from '../../services/ConnectQuery';

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
        const dataSet = GetDataSet(this.props);
        if ( !dataSet ) { return null; }

        const { datasetId, title, description, imageUrl, collections } = dataSet.metadata;

        const collectionItems: CollectionMetadata[] = collections && collections.items
            ? collections.items
            : [];

        const currentCollection = DataSet.getCurrentCollectionName(collectionItems, this.props.match.params.collection);

        return (
            <DataSetBody
                title={title}
                description={description}
                imageUrl={imageUrl}
                datasetId={datasetId}
                collectionKeys={collectionItems}
                currentCollection={currentCollection}
                match={this.props.match}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const connectedDataSet = connect(mapStateToProps)(DataSet);

export default connectQuery(QUERY_DATASET)(connectedDataSet);