import React, { ComponentType, SFC } from 'react';
import { connect, Dispatch } from 'react-redux';
import { compose } from 'redux';
import verifyResponse, { handleError } from '../../services/verifyResponse';
import { lifecycle, withProps } from 'recompose';
import { RouteComponentProps, withRouter } from 'react-router';
import { History, Location } from 'history';
import { CollectionMetadata, DataSetMetadata, Facet, FacetConfig } from '../../typings/schema';
import metaDataResolver, { MetaDataProps } from '../../services/metaDataResolver';
import renderLoader from '../../services/renderLoader';
import graphqlWithProps from '../../services/graphqlWithProps';
import { reorderUnknownsInList } from '../../services/HandleUnknowns';
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
import { Link, Title } from '../layout/StyledCopy';
import styled, { withProps as withStyledProps } from '../../styled-components';
import MultiSelectForm from '../form/MultiselectForm';
import { debounce } from 'lodash';

import { EsFilter, mergeFilters } from '../../reducers/search';
import { RootState } from '../../reducers/rootReducer';
import { ChildProps } from '../../typings/index';
import { FACET_TYPE } from '../../constants/forms';
import DateRange from '../form/DateRange';

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
    opacity: ${props => (props.loading ? 0.7 : 1)};
`;

const FilterTitle = Title.extend`
    float: left;
    padding-right: 0.5rem;
`;

const ResetLink = Link.extend`
    background: ${props => props.theme.colors.shade.medium};
    color: ${props => props.theme.colors.white};
    position: relative;
    top: 7px;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1.35;
    font-size: 0.75rem;
    border-radius: 50%;
    float: left;
    margin: 1.1vw 0;

    &:hover {
        background: ${props => props.theme.colors.error};
        color: ${props => props.theme.colors.white};
    }
`;

class FacetErrorHandler extends React.Component<any, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }
    componentDidCatch(error: any, info: any) {
        console.error(error, info);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            console.error('fallback');
            return <div>Facet failed to load</div>;
        }
        return this.props.children;
    }
}

const Search: SFC<FullProps> = ({ metadata, data, collectionValues, filters }) => {
    const { collectionList, dataSetId, collection } = metadata.dataSetMetadata!;
    const fields = {
        title: collection!.summaryProperties.title ? collection!.summaryProperties.title!.value : null,
        description: collection!.summaryProperties.description
            ? collection!.summaryProperties.description!.value
            : null,
        image: collection!.summaryProperties.image ? collection!.summaryProperties.image!.value : null
    };
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
                        <FilterTitle>{translate('globals.filters')}</FilterTitle>
                        {!!location.search.length && <ResetLink to={location.pathname}>X</ResetLink>}
                        {filters.length > 0 &&
                            filters.map((filter, idx) => {
                                switch (filter.type) {
                                    case FACET_TYPE.multiSelect:
                                        return (
                                            <FacetErrorHandler>
                                                <MultiSelectForm key={idx} index={idx} />
                                            </FacetErrorHandler>
                                        );
                                    case FACET_TYPE.dateRange:
                                        return (
                                            <FacetErrorHandler>
                                                <DateRange key={idx} index={idx} />
                                            </FacetErrorHandler>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                    </StyledForm>
                </Col>

                <Col sm={27} smOffset={3} smPaddingY={1}>
                    {collectionValues && [
                        <SearchResults
                            key={'results'}
                            dataSetId={dataSetId}
                            collectionId={collection!.collectionId}
                            properties={collection!.summaryProperties}
                            propertyMetadata={collection!.properties.items}
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

const debounceReplace = debounce((history: History, path: string) => {
    history.replace(path);
}, 300);

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
    metaDataResolver<ApolloProps>(QUERY_COLLECTION_PROPERTIES), // TODO: Need to think about a refetch option, it now caches configuration for facets
    renderLoader('metadata'),
    verifyResponse<FullProps, 'metadata'>('metadata', 'dataSetMetadata.collection'),
    graphqlWithProps<ApolloProps>(QUERY_COLLECTION_VALUES),
    handleError('data'),
    connect(mapStateToProps, mapDispatchToProps),
    withProps(({ data, metadata }: FullProps): ExtraProps => ({
        collectionValues: getCollectionValues(data, metadata)
    })),
    lifecycle<FullProps, {}>({
        componentWillReceiveProps(nextProps: FullProps) {
            if (nextProps.callRequested && !this.props.callRequested) {
                const query = nextProps.createQueryString();
                const searchParam = query ? `?search=${encode(query)}` : '';
                debounceReplace(nextProps.history, location.pathname + searchParam);
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
