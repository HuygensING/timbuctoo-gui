import React, { Component } from 'react';

import { RouteComponentProps } from 'react-router';
import { CollectionMetadata } from '../../typings/timbuctoo/schema';
import { getDataSet, getCurrentCollectionName } from '../../services/GetDataSet';
import SearchBody from '../search/SearchBody';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import connectQuery from '../../services/ConnectQuery';
import Loading from '../Loading';

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

    render () {
        const dataSet = getDataSet(this.props);
        if ( !dataSet ) { return <Loading />; }

        const { datasetId, title, description, imageUrl, collections } = dataSet.metadata;

        const collectionItems: CollectionMetadata[] = collections && collections.items
            ? collections.items
            : [];

        const currentCollectionId = getCurrentCollectionName(collectionItems, this.props.match.params.collection);

        return (
            <SearchBody
                title={title}
                description={description}
                imageUrl={imageUrl}
                datasetId={datasetId}
                collectionKeys={collectionItems}
                currentCollectionId={currentCollectionId}
                match={this.props.match}
            />
        );
    }
}

export default connectQuery(QUERY_COLLECTION_PROPERTIES)(Search);