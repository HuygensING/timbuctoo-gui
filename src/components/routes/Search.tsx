import React, { ComponentType, SFC } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Location } from 'history';
import { CollectionMetadata, DataSetMetadata, Facet, FacetConfig } from '../../typings/schema';
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
import { ChildProps } from 'react-apollo';
import handleError from '../../services/handleError';
import { lifecycle, withProps } from 'recompose';
import { mergeFilters } from '../../reducers/search';
import { RootState } from '../../reducers/rootReducer';
import { createEsQueryString } from '../../services/EsQueryStringCreator';
import { encode } from '../../services/UrlStringCreator';

interface StateProps {
    callRequested: boolean;
    createQueryString: () => string;
}

interface DispatchProps {
    mergeFilter: (config: FacetConfig[], options: Facet[], location: Location) => void;
}

interface ExtraProps {
    collectionValues: {
        total?: number;
        prevCursor?: string;
        nextCursor?: string;
        facets: Facet[];
        items: any[];
    } | null;
}

type ApolloProps = ChildProps<
    MetaDataProps & RouteComponentProps<{ dataSet: keyof DataSetMetadata; collection: string }>,
    { dataSets: DataSetMetadata }
>;

type FullProps = ApolloProps & StateProps & DispatchProps & ExtraProps;

const Search: SFC<FullProps> = ({ metadata, data, collectionValues }) => {
    const { collectionList, dataSetId, collection } = metadata.dataSetMetadata!;

    const fields = getValuesFromObject(collection!.summaryProperties);
    const collectionItems: CollectionMetadata[] = collectionList && collectionList.items ? collectionList.items : [];

    return (
        <section>
            <FullHelmet pageName={`search: ${dataSetId}`} />

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
                    {collectionValues && [
                        <SearchResults
                            key={'results'}
                            dataSetId={dataSetId}
                            collectionId={collection!.collectionId}
                            properties={collection!.summaryProperties}
                            results={collectionValues.items}
                            fields={fields}
                        />,
                        <Pagination
                            key={'pagination'}
                            nextCursor={collectionValues && collectionValues.nextCursor}
                            prevCursor={collectionValues && collectionValues.prevCursor}
                        />
                    ]}
                </Col>
            </FullSection>
        </section>
    );
};

const mapStateToProps = (state: RootState) => ({
    callRequested: state.search.callRequested,
    createQueryString: () => createEsQueryString(state.search.filters, state.search.fullText)
});

const mapDispatchToProps = (dispatch: Dispatch<FullProps>) => ({
    mergeFilter: (config: FacetConfig[], options: Facet[], location: Location) =>
        dispatch(mergeFilters(config, options, location))
});

const dataResolver = compose<ComponentType<{}>>(
    withRouter,
    metaDataResolver<ApolloProps>(QUERY_COLLECTION_PROPERTIES),
    renderLoader('metadata'),
    handleError('metadata'),
    graphqlWithProps<ApolloProps>(QUERY_COLLECTION_VALUES),
    handleError(),
    connect(mapStateToProps, mapDispatchToProps),
    withProps(({ data, metadata }: FullProps): ExtraProps => ({
        collectionValues: getCollectionValues(data, metadata)
    })),
    lifecycle<FullProps, {}>({
        componentWillReceiveProps(nextProps: FullProps) {
            if (nextProps.callRequested && !this.props.callRequested) {
                const query = nextProps.createQueryString();
                const searchParam = query ? `?search=${encode(query)}` : '';
                nextProps.history.replace(location.pathname + searchParam);
            } else if (nextProps.data && this.props.data !== nextProps.data) {
                const { collectionValues, metadata, location } = nextProps;
                nextProps.mergeFilter(
                    metadata.dataSetMetadata!.collection!.indexConfig.facet,
                    collectionValues!.facets,
                    location
                );
            }
        }
    })
);

export default dataResolver(Search);
