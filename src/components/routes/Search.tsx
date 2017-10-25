import React, { PureComponent } from 'react';

import { RouteComponentProps } from 'react-router';
import { CollectionMetadata, DataSetMetadata } from '../../typings/schema';
import Loading from '../Loading';
import FullHelmet from '../FullHelmet';
import { Col, FullSection } from '../layout/Grid';
import SearchForm from '../form/SearchForm';
import CollectionTags from '../CollectionTags';
import { reorderUnknownsInList } from '../../services/HandleUnknowns';
import Filters from '../Filters';
import SearchResults from '../search/SearchResults';
import { getValuesFromObject } from '../../services/getValue';
import { getCollectionValues } from '../../services/GetDataSetValues';
import MetadataResolver from '../MetadataResolver';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import QUERY_COLLECTION_VALUES from '../../graphql/queries/CollectionValues';
import Pagination from '../search/Pagination';

interface Props {
    metadata: {
        dataSetMetadata: DataSetMetadata;
    };
    data: {
        dataSets: any;
    };
    loading: boolean;
}

type FullProps = Props & RouteComponentProps<any>;

class Search extends PureComponent<FullProps> {
    static onSearch(values: { search: string }) {
        // TODO: Do a refetch for results using this key || refetch on route
        console.log(values.search);
    }

    static onFilter(values: any) {
        // TODO: create filter logic
        console.log(values);
    }

    render() {
        if (this.props.loading || !this.props.metadata.dataSetMetadata || !this.props.data) {
            return <Loading/>;
        }

        const { collectionList, dataSetId, collection } = this.props.metadata.dataSetMetadata;

        const collectionValues = getCollectionValues(this.props.data.dataSets, dataSetId, collection!.collectionListId);
        const fields = getValuesFromObject(collection!.summaryProperties);

        const collectionItems: CollectionMetadata[] = collectionList && collectionList.items
            ? collectionList.items
            : [];

        return (
            <section>
                <FullHelmet pageName={`search: dataSetId`}/>

                {/* Search functionality */}
                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={1}>
                    <SearchForm
                        submit={Search.onSearch}
                        type={'collection'}
                    />
                </Col>

                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={.5}>
                    <CollectionTags
                        colKeys={reorderUnknownsInList(collectionItems)}
                        dataSetId={dataSetId}
                        currentCollectionListId={collection!.collectionListId}
                    />
                </Col>

                <FullSection>

                    {/* Filter functionality */}
                    <Col sm={12} smPaddingY={1}>
                        <Filters collection={collectionValues} />
                    </Col>

                    <Col sm={27} smOffset={3} smPaddingY={1}>
                        {/* Filter functionality */}

                        {collectionValues && (
                            <SearchResults
                                dataSetId={dataSetId}
                                collectionId={collection!.collectionId}
                                properties={collection!.summaryProperties}
                                results={collectionValues.items}
                                fields={fields}
                            />
                        )}

                        <Pagination nextCursor={collectionValues && collectionValues.nextCursor} prevCursor={collectionValues && collectionValues.prevCursor} />
                    </Col>

                </FullSection>
            </section>
        );
    }
}

export default MetadataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES, QUERY_COLLECTION_VALUES)(Search);