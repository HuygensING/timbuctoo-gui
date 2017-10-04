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
        dataSetMetadata: DataSetMetadata;
    };
}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;
interface State {}

class DataSet extends Component<FullProps, State> {

    render () {
        const { dataSetMetadata } = this.props.data;
        if ( !dataSetMetadata ) { return <Loading />; }

        const { dataSetId, title, description, imageUrl, collectionList } = dataSetMetadata;

        const collectionItems: CollectionMetadata[] = collectionList && collectionList.items
            ? collectionList.items
            : [];

        return (
            <DataSetBody
                title={title ? title.value : ''}
                description={description ? description.value : ''}
                imageUrl={imageUrl ? imageUrl.value : ''}
                dataSetId={dataSetId}
                collectionKeys={collectionItems}
                match={this.props.match}
            />
        );
    }
}

export default connectQuery(QUERY_DATASET)(DataSet);