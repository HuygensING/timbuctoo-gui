import React, { Component } from 'react';

import { RouteComponentProps } from 'react-router';
import { CollectionMetadata } from '../../typings/timbuctoo/schema';
import GetDataSet from '../../services/GetDataSet';
import SearchBody from '../search/SearchBody';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import connectQuery from '../../services/ConnectQuery';

interface Props {
}

interface ApolloProps {
    data: any;
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

        const currentCollection = Search.getCurrentCollectionName(collectionItems, this.props.match.params.collection);

        return (
            <SearchBody
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

export default connectQuery(QUERY_COLLECTION_PROPERTIES)(Search);