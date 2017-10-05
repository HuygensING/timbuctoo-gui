import { PureComponent, default as React } from 'react';
import FullHelmet from '../FullHelmet';
import { Col, FullSection } from '../layout/Grid';
import CollectionTags from '../CollectionTags';
import { CollectionMetadata } from '../../typings/timbuctoo/schema';
import { match } from 'react-router';
import Filters from '../Filters';
import SearchForm from '../form/SearchForm';
import connectQuery from '../../services/ConnectQuery';
import QUERY_COLLECTION_VALUES from '../../graphql/queries/CollectionValues';
import { getCollection } from '../../services/GetDataSet';
import Loading from '../Loading';
import SearchResults from './SearchResults';
import { reorderUnknownsInList } from '../../services/HandleUnknowns';
import { getValuesFromObject } from '../../services/getValue';

interface Props {
    dataSetId: string;
    collectionKeys: CollectionMetadata[];
    currentCollection: CollectionMetadata;
    match: match<any>;
    onSubmit: any;
}

interface ApolloProps {
    data: {
        dataSets: {
            [name: string]: any
        };
    };
}

type FullProps = Props & ApolloProps;

interface State {}

class SearchBody extends PureComponent<FullProps, State> {
    render () {
        const { dataSetId, collectionKeys, currentCollection } = this.props;

        if (!currentCollection || !this.props.data.dataSets) { return <Loading/>; }

        const collectionValues = getCollection(this.props, currentCollection.collectionListId);
        const fields = getValuesFromObject(currentCollection.summaryProperties);

        const { summaryProperties, collectionId, collectionListId } = currentCollection;

        return (
            <section>
                <FullHelmet pageName={`search: dataSetId`}/>

                {/* Search functionality */}
                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={1}>
                    <SearchForm
                        submit={this.props.onSubmit}
                        type={'collection'}
                    />
                </Col>

                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={.5}>
                    <CollectionTags
                        colKeys={reorderUnknownsInList(collectionKeys)}
                        dataSetId={dataSetId}
                        currentCollectionListId={collectionListId}
                    />
                </Col>

                <FullSection>

                    {/* Filter functionality */}
                    <Col sm={12} smPaddingY={1}>
                        <Filters facets={null} />
                    </Col>

                    <Col sm={27} smOffset={3} smPaddingY={1}>
                        {/* Filter functionality */}

                        <SearchResults
                            dataSetId={dataSetId}
                            collectionId={collectionId}
                            properties={summaryProperties}
                            results={collectionValues.items}
                            fields={fields}
                        />
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default connectQuery(QUERY_COLLECTION_VALUES)(SearchBody);