import React, { ComponentType, SFC } from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose } from 'redux';
import { ChildProps } from 'react-apollo';
import { lifecycle, withProps } from 'recompose';
import { RouteComponentProps, withRouter } from 'react-router';

import { Location } from 'history';
import { CollectionMetadata, DataSetMetadata, Facet, FacetConfig } from '../../typings/schema';

import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import renderLoader from '../../services/renderLoader';
import graphqlWithProps from '../../services/graphqlWithProps';
import handleError from '../../services/handleError';
import { reorderUnknownsInList } from '../../services/HandleUnknowns';
import { getValuesFromObject } from '../../services/getValue';
import { getCollectionValues } from '../../services/GetDataSetValues';
import translate from '../../services/translate';
import { createEsQueryString } from '../../services/EsQueryStringCreator';
import { encode } from '../../services/UrlStringCreator';

import QUERY_COLLECTION_PROPERTIES from '../../graphql/queries/CollectionProperties';
import QUERY_COLLECTION_VALUES from '../../graphql/queries/CollectionValues';

import FullHelmet from '../FullHelmet';
import { Col, FullSection } from '../layout/Grid';
import SearchForm from '../form/SearchForm';
import CollectionTags from '../CollectionTags';
import SearchResults from '../search/SearchResults';
import Pagination from '../search/Pagination';
import { Dummy } from '../Dummy';
import { Title } from '../layout/StyledCopy';
import styled, { withProps as withStyledProps } from '../../styled-components';
import MultiSelectForm from '../form/MultiselectForm';

import { EsFilter, mergeFilters } from '../../reducers/search';
import { RootState } from '../../reducers/rootReducer';

interface StateProps {
    filters: EsFilter[];
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

// TODO: this is just a simple loading effect, should be way cooler
const StyledForm = withStyledProps<{ loading: boolean }>(styled.form)`
    opacity: ${props => (props.loading ? 0.5 : 1)};
`;

const Search: SFC<FullProps> = ({ metadata, data, collectionValues, filters }) => {
    const { collectionList, dataSetId, collection } = metadata.dataSetMetadata!;

    const fields = getValuesFromObject(collection!.summaryProperties);
    const collectionItems: CollectionMetadata[] = collectionList && collectionList.items ? collectionList.items : [];

    return (
        <section>
            <FullHelmet pageName={`search: ${dataSetId}`} />

            <Col sm={42} smOffset={3} xs={46} xsOffset={1} smPaddingTop={1}>
                {/* TODO: Connect the fulltext search as well */}
                <SearchForm type={'collection'} loading={data!.loading} />
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
                    <StyledForm onSubmit={e => e.preventDefault()} loading={data!.loading}>
                        <Title>{translate('globals.filters')}</Title>
                        <Dummy text={'search-filter'} height={1} marginY={0.5} />
                        {filters.length > 0 &&
                            filters.map((filter, idx) => <MultiSelectForm key={idx} filter={filter} index={idx} />)}
                    </StyledForm>
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
    filters: state.search.filters,
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
