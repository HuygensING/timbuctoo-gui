import { PureComponent, default as React } from 'react';
import FullHelmet from '../FullHelmet';
import { Col, FullSection } from '../layout/Grid';
import CollectionTags from '../CollectionTags';
import { Dummy } from '../Dummy';
import { CollectionMetadata, DataSets } from '../../typings/timbuctoo/schema';
import { match } from 'react-router';
import SearchResults from './SearchResults';
import Filters from '../Filters';
import SearchForm from '../form/SearchForm';
import connectQuery from '../../services/ConnectQuery';
import QUERY_COLLECTION_VALUES from '../../graphql/queries/CollectionValues';
import { getCollection } from '../../services/GetDataSet';
import Loading from '../Loading';

interface Props {
    datasetId: string;
    collectionKeys: CollectionMetadata[];
    currentCollectionIndex: number;
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
        const { datasetId, collectionKeys } = this.props;
        const collection = getCollection(this.props);

        if (!collection) { return <Loading/>; }

        console.log(collection);

        return (
            <section>
                <FullHelmet pageName={`search: datasetId`}/>

                {/* Search functionality */}
                <Col sm={42} smOffset={3} smPaddingTop={1}>
                    <SearchForm onSubmit={this.props.onSubmit} />
                </Col>

                <Col sm={42} smOffset={3} smPaddingTop={1}>
                    <CollectionTags colKeys={collectionKeys} datasetId={datasetId}/>
                </Col>

                <FullSection>

                    {/* Filter functionality */}
                    <Col sm={12} smPaddingTop={2}>
                        <Filters />
                    </Col>

                    <Col sm={27} smOffset={3}>
                        {/* Filter functionality */}
                        <SearchResults />
                        <Dummy text={'Pagination'} height={2} marginY={2}/>
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default connectQuery(QUERY_COLLECTION_VALUES)(SearchBody);