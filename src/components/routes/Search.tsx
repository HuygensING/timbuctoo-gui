import React, { Component } from 'react';

import { RouteComponentProps } from 'react-router';
import { CollectionMetadata, DataSetMetadata } from '../../typings/timbuctoo/schema';
import { getCurrentCollection } from '../../services/GetDataSet';
import SearchBody from '../search/SearchBody';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import connectQuery from '../../services/ConnectQuery';
import Loading from '../Loading';

interface Props {
}

interface ApolloProps {
    data: {
        metadata: DataSetMetadata;
    };
}

type FullProps = Props & ApolloProps & RouteComponentProps<any>;

interface State {
}

class Search extends Component<FullProps, State> {
    static onSearch (values: {search: string}) {
        // TODO: Do a refetch for results using this key
        console.log(values.search);
    }

    static onFilter (values: any) {
        console.log(values);
    }

    render () {
        console.log(this.props.data);
        const { metadata } = this.props.data;
        if ( !metadata ) { return <Loading />; }

        const { title, description, imageUrl, collections } = metadata;

        const collectionItems: CollectionMetadata[] = collections && collections.items
            ? collections.items
            : [];

        const currentCollection = getCurrentCollection(collectionItems, this.props.match.params.collection);

        return (
            <SearchBody
                title={title}
                description={description}
                imageUrl={imageUrl}
                datasetId={this.props.match.params.dataSet}
                collectionKeys={collectionItems}
                currentCollection={currentCollection}
                match={this.props.match}
            />
        );
    }
}

export default connectQuery(QUERY_COLLECTION_PROPERTIES)(Search);