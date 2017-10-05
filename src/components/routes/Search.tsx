import React, { Component } from 'react';

import { RouteComponentProps } from 'react-router';
import { CollectionMetadata, DataSetMetadata } from '../../typings/timbuctoo/schema';
import SearchBody from '../search/SearchBody';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import connectQuery from '../../services/ConnectQuery';
import Loading from '../Loading';

interface Props {
}

interface ApolloProps {
    data: {
        dataSetMetadata: DataSetMetadata;
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
        const { dataSetMetadata } = this.props.data;
        if ( !dataSetMetadata ) { return <Loading />; }

        const { title, description, imageUrl, collectionList, collection } = dataSetMetadata;

        const collectionItems: CollectionMetadata[] = collectionList && collectionList.items
            ? collectionList.items
            : [];

        return (
            <SearchBody
                title={title}
                description={description}
                imageUrl={imageUrl}
                onSubmit={Search.onSearch}
                dataSetId={this.props.match.params.dataSet}
                collectionKeys={collectionItems}
                currentCollection={collection}
                match={this.props.match}
            />
        );
    }
}

export default connectQuery(QUERY_COLLECTION_PROPERTIES)(Search);