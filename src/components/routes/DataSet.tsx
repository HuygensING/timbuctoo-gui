import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { CollectionMetadata, DataSetMetadata } from '../../typings/timbuctoo/schema';
import DataSetBody from '../dataSet/DataSetBody';
import QUERY_DATASET from '../../graphql/queries/DataSet';
import connectQuery from '../../services/ConnectQuery';
import Loading from '../Loading';

interface Props {}

interface ApolloProps {
    data: {
        metadata: DataSetMetadata;
    };
}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;
interface State {}

class DataSet extends Component<FullProps, State> {

    render () {
        const { metadata } = this.props.data;
        if ( !metadata ) { return <Loading />; }

        const { dataSetId, title, description, imageUrl, collections } = metadata;

        const collectionItems: CollectionMetadata[] = collections && collections.items
            ? collections.items
            : [];

        return (
            <DataSetBody
                title={title}
                description={description}
                imageUrl={imageUrl}
                dataSetId={dataSetId}
                collectionKeys={collectionItems}
                match={this.props.match}
            />
        );
    }
}

export default connectQuery(QUERY_DATASET)(DataSet);