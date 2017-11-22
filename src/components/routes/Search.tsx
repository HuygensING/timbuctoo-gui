import React, { ComponentType, PureComponent } from 'react';
import { CollectionMetadata, DataSetMetadata } from '../../typings/schema';
import FullHelmet from '../FullHelmet';
import { Col, FullSection } from '../layout/Grid';
import SearchForm from '../form/SearchForm';
import CollectionTags from '../CollectionTags';
import { reorderUnknownsInList } from '../../services/HandleUnknowns';
import Filters from '../Filters';
import SearchResults from '../search/SearchResults';
import { getValuesFromObject } from '../../services/getValue';
import { getCollectionValues } from '../../services/GetDataSetValues';
import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import QUERY_COLLECTION_VALUES from '../../graphql/queries/CollectionValues';
import Pagination from '../search/Pagination';
import Loading from '../Loading';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import graphqlWithProps from '../../services/graphqlWithProps';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import renderLoaderIfNoMetadata from '../../services/renderLoaderIfNoMetadata';
import { ChildProps } from 'react-apollo';

type FullProps = ChildProps<MetaDataProps, { dataSets: DataSetMetadata }>;

class Search extends PureComponent<FullProps> {

    render () {
        if (!this.props.metadata || !this.props.metadata.dataSetMetadata) {
            return <Loading/>;
        }

        const { collectionList, dataSetId, collection } = this.props.metadata.dataSetMetadata;

        const collectionValues = getCollectionValues(this.props.data!.dataSets, dataSetId, collection!.collectionListId);
        const fields = getValuesFromObject(collection!.summaryProperties);

        const collectionItems: CollectionMetadata[] = collectionList && collectionList.items
            ? collectionList.items
            : [];

        return (
            <section>
                <FullHelmet pageName={`search: dataSetId`}/>

                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={1}>
                    {/* TODO: Connect the fulltext search as well */}
                    <SearchForm type={'collection'}/>
                </Col>

                <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={.5}>
                    <CollectionTags
                        colKeys={reorderUnknownsInList(collectionItems)}
                        dataSetId={dataSetId}
                        currentCollectionListId={collection!.collectionListId}
                        replace={true}
                    />
                </Col>

                <FullSection>

                    <Col sm={12} smPaddingY={1}>
                        <Filters
                            loading={this.props.data!.loading}
                            currentCollectionListId={collection!.collectionListId}
                            collection={collectionValues}
                            facetConfigs={collection!.indexConfig.facet}
                        />
                    </Col>

                    <Col sm={27} smOffset={3} smPaddingY={1}>

                        {collectionValues && (
                            <SearchResults
                                dataSetId={dataSetId}
                                collectionId={collection!.collectionId}
                                properties={collection!.summaryProperties}
                                results={collectionValues.items}
                                fields={fields}
                            />
                        )}

                        <Pagination
                            nextCursor={collectionValues && collectionValues.nextCursor}
                            prevCursor={collectionValues && collectionValues.prevCursor}
                        />
                    </Col>

                </FullSection>
            </section>
        );
    }
}

const dataResolver = compose<ComponentType<{}>>(
    withRouter,
    metaDataResolver(QUERY_COLLECTION_PROPERTIES),
    renderLoaderIfNoMetadata,
    graphqlWithProps(QUERY_COLLECTION_VALUES)
);

export default dataResolver(Search);