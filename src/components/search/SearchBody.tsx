import { PureComponent, default as React } from 'react';
import FullHelmet from '../FullHelmet';
import { Col, FullSection } from '../layout/Grid';
import CollectionTags from '../CollectionTags';
import { CollectionMetadata, DataSets } from '../../typings/timbuctoo/schema';
import { match } from 'react-router';
import Filters from '../Filters';
import SearchForm from '../form/SearchForm';
import connectQuery from '../../services/ConnectQuery';
import QUERY_COLLECTION_VALUES from '../../graphql/queries/CollectionValues';
import { getCollection } from '../../services/GetDataSet';
import Loading from '../Loading';
import SearchResults from './SearchResults';

interface Props {
    datasetId: string;
    collectionKeys: CollectionMetadata[];
    currentCollection: CollectionMetadata;
    match: match<any>;
    onSubmit: any;
}

interface ApolloProps {
    data: {
        dataSets: DataSets;
    };
}

type FullProps = Props & ApolloProps;

interface State {}

class SearchBody extends PureComponent<FullProps, State> {
    render () {
        const { datasetId, collectionKeys, currentCollection } = this.props;
        const collection = getCollection(this.props, currentCollection.collectionListId);

        if (!collection) { return <Loading/>; }

        return (
            <section>
                <FullHelmet pageName={`search: datasetId`}/>

                {/* Search functionality */}
                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={1}>
                    <SearchForm onSubmit={this.props.onSubmit} />
                </Col>

                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={.5}>
                    <CollectionTags colKeys={collectionKeys} datasetId={datasetId} currentCollectionListId={currentCollection.collectionListId}/>
                </Col>

                <FullSection>

                    {/* Filter functionality */}
                    <Col sm={12} smPaddingY={1}>
                        <Filters facets={collection.facets} />
                    </Col>

                    <Col sm={27} smOffset={3} smPaddingY={1}>
                        {/* Filter functionality */}

                        <SearchResults
                            datasetId={datasetId}
                            collectionId={currentCollection.collectionId}
                            properties={currentCollection.summaryProperties}
                            results={collection.items}
                        />
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default connectQuery(QUERY_COLLECTION_VALUES)(SearchBody);