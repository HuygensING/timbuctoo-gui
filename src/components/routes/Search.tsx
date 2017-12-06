import React, { ComponentType, SFC } from 'react';
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
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import graphqlWithProps from '../../services/graphqlWithProps';
import { compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import renderLoader from '../../services/renderLoader';
import verifyResponse from '../../services/verifyResponse';
import { ChildProps } from '../../typings';

type FullProps = ChildProps<
    MetaDataProps & RouteComponentProps<{ dataSet: string; collection: string }>,
    { dataSets: DataSetMetadata }
>;

const Search: SFC<FullProps> = ({ metadata, data }) => {
    const { collectionList, dataSetId, collection } = metadata.dataSetMetadata!;

    const collectionValues = getCollectionValues(data!.dataSets, dataSetId, collection!.collectionListId);
    const fields = getValuesFromObject(collection!.summaryProperties);

    const collectionItems: CollectionMetadata[] = collectionList && collectionList.items ? collectionList.items : [];

    return (
        <section>
            <FullHelmet pageName={`search: dataSetId`} />

            <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={1}>
                {/* TODO: Connect the fulltext search as well */}
                <SearchForm type={'collection'} />
            </Col>

            <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={0.5}>
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
                        loading={data!.loading}
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
};

const dataResolver = compose<ComponentType<{}>>(
    withRouter,
    metaDataResolver<FullProps>(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    verifyResponse<FullProps, 'metadata'>('metadata', 'dataSetMetadata.collection'),
    graphqlWithProps<FullProps>(QUERY_COLLECTION_VALUES),
    renderLoader(),
    verifyResponse<FullProps, 'data'>(
        'data',
        props =>
            `dataSets.${props.match.params.dataSet}.${props.metadata.dataSetMetadata!.collection!.collectionListId}`
    )
);

export default dataResolver(Search);
